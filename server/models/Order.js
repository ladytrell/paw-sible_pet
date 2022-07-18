const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
