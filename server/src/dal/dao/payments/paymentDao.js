const Order = require('../../../models/orders/orderListingModel');
const { logerror } = require('../../../helpers/logger');

class PaymentDAO {
  constructor() {
    this.Order = Order; 
  }

  async createOrder(userId, orderData) {
    try {
      const order = new this.Order({
        buyer: userId,
        total: orderData.total, 
        items: orderData.items,
        date: new Date().toISOString(),
        email: orderData.email,
        status: 'generated',
        paymentReference: orderData.paymentReference,
        paymentStatus: 'pending',
      });
      await order.save();
      return { success: true, data: order };
    } catch (err) {
      logerror.error('Error creating order:', err);
      return { success: false, message: err.message, data: null };
    }
  }

    async updateOrderStatus(paymentReference, status, paymentStatus) {
        try {
            const order = await this.Order.findOne({ paymentReference });
            if (!order) {
                return { success: false, message: 'Order not found', data: null };
            }
            order.status = status;
            order.paymentStatus = paymentStatus;
            await order.save();
            return { success: true, data: order };
        } catch (err) {
            logerror.error('Error updating order status:', err);
            return { success: false, message: err.message, data: null };
        }
    }

    async findOrderByReference(paymentReference) {
        try {
            const order = await this.Order.findOne({ paymentReference });
            return { success: true, data: order };
        } catch (err) {
            logerror.error('Error finding order by reference:', err);
            return { success: false, message: err.message, data: null };
        }
    }
}

module.exports = PaymentDAO;