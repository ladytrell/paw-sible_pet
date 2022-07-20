const mongoose = require('mongoose');

const { Schema } = mongoose;
/*
Category
Provider name
Time slot
*/
const reservationSchema = new Schema({
    provider:
    {
      type: Schema.Types.ObjectId,
      ref: 'Provider'
    },
    timeSlot:
    {
      type: String,
      required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;