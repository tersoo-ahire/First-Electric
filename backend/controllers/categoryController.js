const AppError = require("./../utils/appError");
const Category = require('../models/categoryModel');

exports.createCategory = async(req, res, next)=>{
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        return next(error);
    }
}

exports.getCategories = async(req, res, next)=>{
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            count: categories.length,
            data: categories
        })
    } catch (error) {
        return next(error);
    }
}

exports.fetchCategory = async(req, res, next)=>{
    try {
        const category = await Category.findOne({slug: req.params.slug});
        if(!category) return next(new AppError('Category not found', 404));
        res.status(200).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category) return next(new AppError('Category not found', 404));
        res.status(204).end();
    } catch (error) {
        return next(error);
    }
}