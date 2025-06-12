const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const PaymentDAO = require('../../dal/dao/payments/paymentDao');
const ProductService = require('../../service/product/product');
const { logerror } = require('../../helpers/logger');

class PaymentService {
    constructor() {
        this.paymentDAO = new PaymentDAO();
        this.productService = new ProductService();
    }

    async initializePayment(user, orderData) {
    try {
      console.log('User in initializePayment:', user);
      if (!user || !user.email || !user.id || !orderData.items) {
        return { status: 400, success: false, message: 'Missing user email, ID, or items', data: null };
      }

      const validationResult = await this.productService.validateOrderItems(orderData.items, orderData.total);
      if (!validationResult.success) {
        return { status: validationResult.status, success: false, message: validationResult.message, data: null };
      }

      const { items, total } = validationResult.data;
      const reference = `order_${user.id}_${Date.now()}`; 

      const transaction = await paystack.transaction.initialize({
        email: user.email,
        amount: total, 
        currency: 'NGN',
        reference,
        callback_url: process.env.PAYSTACK_CALLBACK_URL || 'http://localhost:3000/talentdashboard',
        metadata: { userId: user.id.toString() }, 
      });

      if (!transaction.status || !transaction.data.authorization_url) {
        logerror.error('Paystack initialization failed:', transaction.message);
        return { status: 500, success: false, message: 'Payment initialization failed', data: null };
      }

      const orderResult = await this.paymentDAO.createOrder(user.id, { // Use user.id
        total: total / 100, // Convert to NGN
        items,
        email: user.email,
        paymentReference: transaction.data.reference,
      });

      if (!orderResult.success) {
        return { status: 500, success: false, message: orderResult.message, data: null };
      }

      for (const item of items) {
        await this.productService.productDAO.updateStock(item.productId, item.quantity);
      }

      return {
        status: 200,
        success: true,
        message: 'Payment initialized successfully',
        data: { authorization_url: transaction.data.authorization_url, reference: transaction.data.reference },
      };
    } catch (err) {
      logerror.error('Error initializing payment:', err);
      return { status: 500, success: false, message: 'Payment initialization failed', data: null };
    }
  }

  async verifyPayment(reference) {
    try {
      const transaction = await paystack.transaction.verify({ reference });

      const txStatus = transaction?.data?.status;
      const paystackMessage = transaction?.message || "";

      if (!transaction.status) {
        return {
          status: 400,
          success: false,
          message: `Payment verification failed: ${paystackMessage || "Invalid response from Paystack"}`,
          data: null,
        };
      }

      if (txStatus !== "success") {
        return {
          status: 400,
          success: false,
          message: `Payment was not successful. Status: ${txStatus}`,
          data: {
            reference,
            status: txStatus,
          },
        };
      }

      const orderResult = await this.paymentDAO.updateOrderStatus(reference, {
        paymentStatus: "completed",
        status: "confirmed",
      });


      if (!orderResult.success) {
        return {
          status: 500,
          success: false,
          message: orderResult.message,
          data: null,
        };
      }

      return {
        status: 200,
        success: true,
        message: "Payment verified successfully",
        data: {
          reference,
          amount: transaction.data.amount / 100,
          status: txStatus,
        },
      };
    } catch (err) {
      logerror.error("Error verifying payment:", err);
      return {
        status: 500,
        success: false,
        message: `Verification failed: ${err.message}`,
        data: null,
      };
    }
  }

}

module.exports = PaymentService;