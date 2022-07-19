const mongoose = require('mongoose');

const { Schema } = mongoose;

const petProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  }
});

const PetProfile = mongoose.model('PetProfile', petProfileSchema);

module.exports = PetProfile;
