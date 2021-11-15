const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  place: {
    type: Object
  },
  locationCoords: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donor = (module.exports = mongoose.model('donor', donorSchema));

module.exports.get = function (callback, limit) {
  Contact.find(callback).limit(limit);
};
