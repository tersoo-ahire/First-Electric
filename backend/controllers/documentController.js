const AppError = require("./../utils/appError");
const Document = require("../models/documentModel");

exports.createDocument = async (req, res, next) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json({
      status: "success",
      data: document,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.status(200).json({
      status: "success",
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    return next(error);
  }
};

exports.fetchDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({ slug: req.params.slug });
    if (!document) return next(new AppError("Document not found", 404));
    res.status(200).json({
      status: "success",
      data: document,
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return next(new AppError("Document not found", 404));
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
