const express = require("express");
const productController = require('../controllers/productController');
const auth = require('../controllers/authController');

const router = express.Router();

router.get('/available', productController.getAvailableProducts)

router.get('/category/:slug',auth.AdminCheck, productController.getProductsByCategory)

router.get('/filter-price/:slug', productController.filterProductsByPrice)

router.get('/paginate',auth.AdminCheck, productController.getPaginatedProducts)

router.get('/featured',auth.AdminCheck, productController.getFeaturedProducts)

router.post('/get-details', productController.getProductsDetails)

router.get('/popular',auth.AdminCheck, productController.getPopularProducts)

router.patch('/publish/:id', productController.publish)

router.patch('/unpublish/:id', productController.unPublish)

router.get('/:slug', productController.fetchProduct)

router.route('/')
    .post(productController.createProduct)
    .get(productController.getProducts)

router.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;