const mongoose = require('mongoose');

let SubscriptionSchema = new mongoose.Schema({
  memberId: String,
  moviesId: String,
  date: Number
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);
