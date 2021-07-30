const express = require('express');
const memberUtils = require('../models/members/memberUtils');
const router = express.Router();

//Get all Members
router.route('/').get(async function (req, res) {
  try {
    let m = await memberUtils.getAllMemebers();
    res.status(200).json(m);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Member by id
router.route('/:id').get(async function (req, res) {
  try {
    const mId = req.params.id;
    let u = await memberUtils.getMemberById(mId);
    res.status(200).json(u);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Member
router.route('/:id').put(async function (req, res) {
  console.log('member router update member');
  try {
    const body = req.body;
    const mId = req.params.id;
    console.log('id: ', mId);
    console.log('body: ', body);
    let updated = await memberUtils.updateMember(mId, body);
    res.status(200).json(updated);
  } catch (err) {
    console.log('error updating movie', err);
    res.status(500).json({ message: 'Cold not create: server error' });
  }
});

//Create Member
router.route('/').post(async function (req, res) {
  console.log('create member');
  try {
    const body = req.body;
    console.log('create body: ', body);
    let created = await memberUtils.createMember(body);
    res.status(200).json(created);
  } catch (err) {
    console.log('error creating movie', err);
    res.status(500).json({ message: 'Cold not create: server error' });
  }
});

//DELETE Member and all his Subscriptions
router.route('/:id').delete(async function (req, res) {
  try {
    const mId = req.params.id;
    console.log('deleting member', mId);
    let message = await memberUtils.deleteMember(mId);
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Error deleting - ServerError', error: err });
  }
});

module.exports = router;
