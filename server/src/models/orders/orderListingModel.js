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
  status: { type: String, enum: ['generated', 'confirmed', 'cancelled'], default: 'generated' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentReference: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);