const mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  city: String
});

module.exports = mongoose.model('members', MemberSchema);
