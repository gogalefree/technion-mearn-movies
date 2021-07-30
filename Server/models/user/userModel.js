const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  fullName: String,
  userName: String,
  password: String
});

module.exports = mongoose.model('users', UserSchema);
