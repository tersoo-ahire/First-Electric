const express = require("express");
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getCategories)

router.get('/:slug', categoryController.fetchCategory)

router.delete('/:id', categoryController.delete)

module.exports = router;