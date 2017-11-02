var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});
var eventSchema = new mongoose.Schema({
  eventName: {
    type: String
  },
  Description: {
    type: String,
  },
  company: {
    type: String,
    required: true
  },
  
  capacity: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  inputAddress: {
    type: String
  },
  // phone : {
  //   type : Number,
  //   required:true,
  // },
  inputCity: {
    type: String
  },
  inputState: {
    type: String
  },
  inputZip: {
    type: String
  }
});

var roomSchema = new mongoose.Schema({
  type: String,
  number: Number,
  description: String,
  photos: [String],
  price: Number
});

var hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  services: [String],
  photos: [String],
  currency: String,
  reviews: [reviewSchema],
  rooms: [roomSchema],
  events: [eventSchema],
  location: {
    address: String,
    // Always store coordinates longitude (East/West), latitude (North/South) order.
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  }
});

mongoose.model('Hotel', hotelSchema);
