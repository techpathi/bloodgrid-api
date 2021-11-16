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
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

donorSchema.index({ location: '2dsphere' });

const Donor = (module.exports = mongoose.model('donor', donorSchema));

module.exports.get = function (callback, limit) {
  Donor.find(callback).limit(limit);
};
