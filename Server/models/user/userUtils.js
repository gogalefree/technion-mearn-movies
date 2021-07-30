const { v4: uuidv4 } = require('uuid');
const User = require('./userModel');

exports.loginUser = function (un, pwd) {
  return new Promise(async (resolve, reject) => {
    const u = await User.findOne({ userName: un, password: pwd }).exec();
    console.log(`user utiles login user: `, u);
    if (u) {
      resolve({ auth: true, token: uuidv4(), fullName: u.fullName });
    } else {
      reject({ message: 'Not Found' });
    }
  });
};

exports.createUser = async function (u) {
  try {
    const m = await User.create(u);
    return m;
  } catch (err) {
    throw new Error(err);
  }
};
