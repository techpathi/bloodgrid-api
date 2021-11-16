const router = require('express').Router();
const donorController = require('../controllers/donorController');

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'All endpoints are up and running!' });
});

router.route('/donors').post(donorController.addDonor);
router.route('/donors/findNearBy').post(donorController.findNearBy);

module.exports = router;
