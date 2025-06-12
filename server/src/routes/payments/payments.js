const express = require('express');
const router = express.Router();
const paymentControllers = require('../../controllers/payments/payments');
const { authMiddleware } = require('../../middlewares/authentication/authMiddleware');

const paymentControllerInstance = paymentControllers();

module.exports = () => {
    router
        .post('/initialize', authMiddleware, paymentControllerInstance.initializePayment)
        .get('/verify', authMiddleware, paymentControllerInstance.verifyPayment)
        .post('/webhook', paymentControllerInstance.handleWebhook); 
    return router;
};