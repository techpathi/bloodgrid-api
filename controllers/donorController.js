const fetch = require('node-fetch');
const Donor = require('../model/donorModel');
const GEOCODING_API_KEY = '<API Key here>';

let donorController = {};

donorController.addDonor = async function (req, res) {
  let donor = new Donor();

  let { fullName, age, gender, bloodGroup, place, locationCoords } = req.body;
  donor.fullName = fullName;
  donor.age = age;
  donor.gender = gender;
  donor.bloodGroup = bloodGroup;
  donor.place = place;
  if (locationCoords !== null) {
    donor.location = {
      type: 'Point',
      coordinates: [locationCoords.latitude, locationCoords.longitude]
    };
  } else if (place !== null) {
    let geoData = await geoCodeThisPlace(place.value.place_id);
    console.log(geoData);
    if (geoData !== null) {
      donor.location = {
        type: 'Point',
        coordinates: [geoData.lat, geoData.lng]
      };
    }
  }
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

async function geoCodeThisPlace(placeId) {
  console.log('In geocoding fetch');
  let response =
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}
&key=${API_KEY}`);
  if (response.ok) {
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    let data = jsonResponse.results[0].geometry.location;
    return data;
  }
  return null;
}

module.exports = donorController;
