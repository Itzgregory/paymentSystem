const express = require('express');
const router = express.Router();
const cors = require('cors');
const routerUsers = require('./user/user');
const routerPayments = require('./payments/payments');
const routerProduct = require('./products/product'); 

module.exports = () => {
    router
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(
            cors({
                credentials: true,
                origin: ["http://localhost:8080", "http://localhost:3000"],
            })
        );

    router.use('/', routerUsers());
    router.use('/payments', routerPayments());
    router.use('/products', routerProduct());

    return router;
};