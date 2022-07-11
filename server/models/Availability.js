const mongoose = require('mongoose');

const { Schema } = mongoose;

const availabilitySchema = new Schema({
  time: {
    type: String,
    required: true,
    trim: true
  }
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
