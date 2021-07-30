const memberUtils = require('../members/memberUtils');
const movieUtils = require('../movies/moviesUtils');
const Subscription = require('./subscriptionSchema');

exports.getAllSubscriptions = function () {
  return new Promise((resolve, reject) => {
    //Get All Sbscriptions
    Subscription.find({}, async function (err, data) {
      if (err) {
        console.log('get all subscriptions error :>> ', err);
        reject(err);
      } else {
    //       resolve(data);
    //   }})})};

        //Get Member name for each subscription
        const subsWithMemberName = await data.map(async (s) => {
          const member = await memberUtils.getMemberById(s.memberId);
          const d = {
            ...s._doc,
            fullName: member._doc.fullName,
            email: member._doc.email,
            city: member._doc.city
          };

          //Get Movie Details for each subscription
          console.log('movie id', s._doc.moviesId);
          const movie = await movieUtils.getMovieById(s._doc.moviesId);
          console.log('movie: ', movie);
          const final = {
            ...d,
            movieName: movie._doc.name,
            yearPremiered: movie._doc.yearPremiered,
            movieUrl: movie._doc.imageUrl
          };

          return final;
        });

        Promise.all(subsWithMemberName).then((values) => {
          resolve(values);
        });
      }
    });
  });
};

exports.createSubscription = async function (data) {
  try {
    const s = await Subscription.create({
      memberId: data.memberId,
      moviesId: data.moviesId,
      date: data.date
    });
    return s;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteAllSubscriptionsForMember = async function (memberId) {
  try {
    const s = await Subscription.deleteMany({ memberId: memberId });
    return s;
  } catch (err) {
    throw new Error(err);
  }
};
