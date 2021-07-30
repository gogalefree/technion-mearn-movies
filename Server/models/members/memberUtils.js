const Member = require('./membersModel');
const subscriptionUtils = require('../subscriptions/subscriptionsUtils');

exports.getAllMemebers = function () {
  return new Promise((resolve, reject) => {
    Member.find({}, function (err, data) {
      if (err) {
        console.log('get all members error :>> ', err);
        reject(err);
      } else {
        console.log('get all members data :>> ', data);
        resolve(data);
      }
    });
  });
};

exports.getMemberById = async function (memberId) {
  try {
    const m = await Member.findById(memberId).exec();
    return m;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMember = async function (data) {
  try {
    const m = await Member.create({
      fullName: data.fullName,
      email: data.email,
      city: data.city
    });
    return m;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteMember = async function (memberId) {
  try {
    console.log('member utils deleting');
    await Member.findByIdAndDelete(memberId);
    await subscriptionUtils.deleteAllSubscriptionsForMember(memberId);
    return { message: 'Deleted Succesfully' };
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateMember = async function (id, data) {
  try {
    let u = await Member.where({ _id: id })
      .update({
        fullName: data.fullName,
        email: data.email,
        city: data.city
      })
      .exec();
    return u;
  } catch (err) {
    throw new Error(err);
  }
};
