const express = require('express');
const subscriptionsUtils = require('../models/subscriptions/subscriptionsUtils');
const router = express.Router();

//Get all Movies
router.route('/').get(async function (req, res) {
  try {
    let u = await subscriptionsUtils.getAllSubscriptions();
    res.status(200).json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route('/').post(async function (req, res) {
  try {
    const body = req.body;
    console.log('create sub body: ', body);
    let created = subscriptionsUtils.createSubscription(body);
    res.status(200).json(created);
  } catch (err) {
    console.log('error creating subscription', err);
    res
      .status(500)
      .json({ message: 'Cold not create subscription: server error' });
  }
});
module.exports = router;
