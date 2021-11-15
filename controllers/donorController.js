const Donor = require('../model/donorModel');

exports.new = function (req, res) {
  let donor = new Donor();

  let { fullName, age, gender, bloodGroup, place, locationCoords } = req.body;
  donor.fullName = fullName;
  donor.age = age;
  donor.gender = gender;
  donor.bloodGroup = bloodGroup;
  donor.place = place;
  donor.locationCoords = locationCoords;

  donor.save(err => {
    if (err) res.status(400).json(err);
    else {
      res.json({
        message: 'Donor added successfully!',
        data: donor
      });
    }
  });
};
