const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  date: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'generated' },
  paymentReference: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Order', orderSchema);