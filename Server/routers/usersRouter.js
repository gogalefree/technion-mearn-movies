const express = require('express');
const usersUtils = require('../models/user/userUtils');
const router = express.Router();

// //Get all Users
// router.route('/').get(async function (req, res) {
//   try {
//     let u = await usersUtils.getAllUsers();
//     res.status(200).json(u);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //Get User by ID
// router.route('/:id').get(getUser, function (req, res) {
//   res.json(res.user);
// });

// //Update user
// router.route('/:id').put(getUser, async function (req, res) {
//   console.log('updated:' + req.body);
//   try {
//     let updated = await usersUtils.updateUser(res.user, req.body);
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //DELETE User
// router.route('/:id').delete(getUser, function (req, res) {
//   try {
//     let message = usersUtils.deleteUser(res.user);
//     return res.status(200).json(message);
//   } catch (err) {
//     return res.status(500).json(err.message);
//   }
// });

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

// //User Middleware
// async function getUser(req, res, next) {
//   let user;
//   try {
//     user = await usersUtils.getUser(req.params.id);
//     if (user == null) {
//       return res.status(404).json({ message: 'cannot find user' });
//     }
//   } catch (err) {
//     return res.status(404).json({ message: err.message });
//   }

//   res.user = user;
//   next();
// }
module.exports = router;
