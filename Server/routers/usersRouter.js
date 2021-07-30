const express = require('express');
const usersUtils = require('../models/user/userUtils');
const router = express.Router();

//CREATE USER
router.route('/login').post(async function (req, res) {
  try {
    console.log('login user' + req.body);
    let u = await usersUtils.loginUser(req.body.username, req.body.password);
    res.status(200).json(u);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
