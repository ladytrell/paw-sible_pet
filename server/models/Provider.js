const mongoose = require('mongoose');


const { Schema } = mongoose;

const providerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  availability: {
    type: [String],
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
