const mongoose = require('mongoose');

// Tour scheme
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price!'],
  },
});

// Create the model and export it
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
