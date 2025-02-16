const AppError = require("./../utils/appError");
const Cart = require('../models/cartModel');
const jwt = require('jsonwebtoken');

exports.updateCart = async(req, res, next)=>{
    try {
        let products = req.body.products;
        let auth = req.headers['authorization'];
        if(!auth) return next(new AppError('Login to access this resource', 401));
        let authorized = jwt.verify(auth, process.env.JWT_SECRET);
        let cartExists = await Cart.findOne({user: authorized.id});
        if(cartExists) {
            cartExists.products = products;
            await cartExists.save();
            res.status(200).json({
                status: 'success',
                data: cartExists
            })
        } else {
            const newCart = await Cart.create({user: authorized.id, products: products});
            res.status(201).json({
                status: 'success',
                data: newCart
            })
        }
    } catch (error) {
        return next(error);
    }
}


exports.fetchMyCart = async(req, res, next)=>{
    try {
        let auth = req.headers['authorization'];
        if(!auth) return next(new AppError('Login to access this resource', 401));
        let authorized = jwt.verify(auth, process.env.JWT_SECRET);
        const cart = await Cart.findOne({user: authorized.id}).populate('products');
        if(!cart) {
            const newCart = await Cart.create({user: authorized.id});
            res.status(200).json({
                status: 'success',
                data: newCart
            })
        }
        res.status(200).json({
            status: 'success',
            data: cart
        })

    } catch (error) {
        return next(error);
    }
}

// exports.addToCart = async(req, res, next)=>{
//     try {
//         let products = req.body.products;
//         let auth = req.headers['authorization'];
//         let authorized = jwt.verify(auth, process.env.JWT_SECRET);
//         console.log(authorized);
//         let cartExists = await Cart.findOne({user: authorized});
//         if(!cartExists) {
//             const newCart = await Cart.create({user: authorized, products: products});
//             res.status(201).json({
//                 status: 'success',
//                 message: 'Cart updated',
//                 data: newCart
//             })
//         } else {
//             const newProducts = products.filter(product=>{
//                 const alreadyInCart = cartExists.products.includes(product);
//                 if(!alreadyInCart) return product
//             })
//             newProducts.map(product=>{
//                 cartExists.products.push(product)
//             })
//             console.log(cartExists.products);
//             await cartExists.save();
//             res.status(200).json({
//                 status: 'success',
//                 message: 'Cart updated',
//                 data: cartExists
//             })
//         }
//     } catch (error) {
//         return next(error);
//     }
// }