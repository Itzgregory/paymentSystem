const express = require('express');
const router = express.Router();
const productControllers = require('../../controllers/products/product');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');

const productControllerInstance = productControllers();

module.exports = () => {
    router
        .post('/add', authMiddleware, productControllerInstance.addProduct)
        .get('/', productControllerInstance.getProducts);
    return router;
};