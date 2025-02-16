const AppError = require("./../utils/appError");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const algoliaSearch = require("algoliasearch");
const client = algoliaSearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex("dev_PRODUCTS");

cloudinary.config({
  cloud_name: "firstelectric",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createProduct = async (req, res, next) => {
  try {
    let data = _.pick(req.body, [
      "name",
      "description",
      "category",
      "stock",
      "price",
      "status",
      "featured",
      "weight",
      "overview",
    ]);
    let { images, thumbnail } = req.body;
    const product = await Product.create(data);
    res.status(201).json({
      status: "success",
      data: product,
    });
    cloudinary.uploader.upload(thumbnail, async (err, result) => {
      if (err) console.log("upload error", err);
      else console.log("thumbnail url: " + result.secure_url);
      await Product.updateOne(
        { _id: product._id },
        { thumbnail: result.secure_url }
      );
    });
    images.map((img) => {
      cloudinary.uploader.upload(img, async (err, result) => {
        if (err) console.log("upload error", err);
        let image = {
          imageURL: result.secure_url,
          publicId: result.public_id,
        };
        await Product.updateOne(
          { _id: product._id },
          { $push: { images: image } }
        );
        cloudinary.uploader.add_tag(
          product._id,
          [result.public_id],
          (err, resp) => {
            if (err) console.log("Error adding tag ", err);
            else console.log("tag updated");
          }
        );
      });
    });

    if (product.stock > 0) product.available = true;
    else product.available = false;
    await product.save();
    index
      .saveObject(product, { autoGenerateObjectIDIfNotExist: true })
      .then(async (object) => {
        console.log("index created ", object);
        await Product.updateOne(
          { _id: product._id },
          { objectID: object.objectID }
        );
      })
      .catch((err) => console.log(err));
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let update = _.pick(req.body, [
      "name",
      "description",
      "category",
      "stock",
      "price",
      "featured",
      "status",
      "overview",
      "weight",
    ]);
    let { new_images, deleted_images, thumbnail } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!product) return next(new AppError("Product not found", 404));
    if (product.stock > 0) product.available = true;
    else product.available = false;
    await product.save();

    if (thumbnail) {
      cloudinary.uploader.upload(thumbnail, async (err, result) => {
        if (err) console.log("thumbnail upload error", err);
        else console.log("thumbnail url: " + result.secure_url);
        await Product.updateOne(
          { _id: product._id },
          { thumbnail: result.secure_url }
        );
      });
    }
    if (deleted_images.length > 0) {
      let updatedImages = product.images.filter((img) => {
        let deleted = deleted_images.some(
          (doc) => doc.publicId === img.publicId
        );
        if (!deleted) return img;
      });
      console.log(updatedImages);
      product.images = updatedImages;
      await product.save();
      deleted_images.map((img) => {
        cloudinary.uploader.destroy(img.publicId, (err, result) => {
          if (err) console.log("Error destroying cloud image", err);
          else console.log(img.publicId + " destroyed");
        });
      });
    }

    if (new_images.length > 0) {
      new_images.map((img) => {
        cloudinary.uploader.upload(img, async (err, result) => {
          if (err) console.log("image upload error", err);
          let image = {
            imageURL: result.secure_url,
            publicId: result.public_id,
          };
          await Product.updateOne(
            { _id: product._id },
            { $push: { images: image } }
          );
          cloudinary.uploader.add_tag(
            product._id,
            [result.public_id],
            (err, resp) => {
              if (err) console.log("Error adding tag ", err);
              else console.log("tag updated");
            }
          );
        });
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
    index
      .partialUpdateObject(product)
      .then((object) => console.log("index updated ", object))
      .catch((err) => console.log(err));
  } catch (error) {
    return next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      status: "success",
      count: products.length,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getPaginatedProducts = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: -1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "category",
    };

    if (req.user && req.user.role === "admin") {
      Product.paginate({}, options, (err, products) => {
        res.status(200).json({
          status: "success",
          data: { ...products },
        });
      });
    } else {
      Product.paginate(
        { available: true, status: "published" },
        options,
        (err, products) => {
          res.status(200).json({
            status: "success",
            data: { ...products },
          });
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

exports.getPopularProducts = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { totalOrders: -1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "category",
    };
    if (req.user && req.user.role === "admin") {
      Product.paginate({}, options, (err, products) => {
        res.status(200).json({
          status: "success",
          data: { ...products },
        });
      });
    } else {
      Product.paginate(
        { available: true, status: "published" },
        options,
        (err, products) => {
          res.status(200).json({
            status: "success",
            data: { ...products },
          });
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return next(new AppError("Category not found", 404));
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      customLabels,
      collation: {
        locale: "en",
      },
    };
    if (req.user && req.user.role === "admin") {
      Product.paginate({ category: category._id }, options, (err, products) => {
        res.status(200).json({
          status: "success",
          category: category,
          data: { ...products },
        });
      });
    } else {
      let { sort } = req.query;
      if (sort === "popularity") options.sort = { totalOrders: -1 };
      if (sort === "recent") options.sort = { createdAt: -1 };
      Product.paginate(
        { category: category._id, available: true, status: "published" },
        options,
        (err, products) => {
          res.status(200).json({
            status: "success",
            category: category,
            data: { ...products },
          });
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

exports.filterProductsByPrice = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    let { min, max } = req.query;
    const rawProducts = await Product.find({ category: category._id });
    const filteredProducts = rawProducts.filter((product) => {
      if (product.price >= min && product.price <= max) return product;
    });
    res.status(200).json({
      status: "success",
      data: filteredProducts,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUnPublishedProducts = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: 1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "category",
    };
    Product.paginate({ status: "draft" }, options, (err, products) => {
      res.status(200).json({
        status: "success",
        data: { ...products },
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAvailableProducts = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: 1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "category",
    };
    Product.paginate(
      { available: true, status: "published" },
      options,
      (err, products) => {
        res.status(200).json({
          status: "success",
          data: { ...products },
        });
      }
    );
  } catch (error) {
    return next(error);
  }
};

exports.getProductsDetails = async (req, res, next) => {
  try {
    let { products } = req.body;

    let missing_products = [];

    const productDetails = await Promise.all(
      products.map(async (product) => {
        let prod = await Product.findById(product);
        if (!prod) {
          // return next(new AppError(`Product ${product} not found`, 404));
          missing_products.push(product);
        }
        return prod;
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        products: productDetails,
        missing_products,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "products",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: 1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "category",
    };
    if (req.user && req.user.role === "admin") {
      Product.paginate({ featured: true }, options, (err, products) => {
        res.status(200).json({
          status: "success",
          data: { ...products },
        });
      });
    } else {
      Product.paginate(
        { featured: true, available: true, status: "published" },
        options,
        (err, products) => {
          res.status(200).json({
            status: "success",
            data: { ...products },
          });
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

exports.unPublish = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "draft" },
      { new: true }
    );
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.publish = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.fetchProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return next(new AppError("Product not found", 404));
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new AppError("Product not found", 404));
    res.status(204).end();
    index
      .deleteObject(product.objectID)
      .then((object) => console.log("index deleted ", object))
      .catch((err) => console.log(err));
  } catch (error) {
    return next(error);
  }
};
