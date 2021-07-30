const Movie = require('../movies/movieScema');

exports.getAllMovies = function () {
  return new Promise((resolve, reject) => {
    Movie.find({}, function (err, data) {
      if (err) {
        console.log('get all movies error :>> ', err);
        reject(err);
      } else {
        // console.log('get all movies data :>> ', data);
        resolve(data);
      }
    });
  });
};

exports.updateMovie = async function (id, updated) {
  try {
    let u = await Movie.where({ _id: id })
      .update({
        name: updated.name,
        yearPremiered: updated.yearPremiered,
        geners: updated.geners,
        imageUrl: updated.imageUrl
      })
      .exec();
    return u;
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMovie = async function (updated) {
  try {
    const m = await Movie.create({
      name: updated.name,
      yearPremiered: updated.yearPremiered,
      geners: updated.geners,
      imageUrl: updated.imageUrl
    });

    return m;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteMovie = async function (movieId) {
  try {
    console.log('movie utils deleting');
    await Movie.findByIdAndDelete(movieId);
    return { message: 'Deleted Succesfully' };
  } catch (err) {
    throw new Error(err);
  }
};

exports.getMovieById = async function (movieId) {
  try {
    const m = await Movie.findById(movieId).exec();
    return m;
  } catch (err) {
    throw new Error(err);
  }
};
