const express = require('express');
const movieUtils = require('../models/movies/moviesUtils');
const router = express.Router();

//Get all Movies
router.route('/').get(async function (req, res) {
  try {
    let u = await movieUtils.getAllMovies();
    res.status(200).json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Get Movie with id
router.route('/:id').get(async function (req, res) {
  try {
    const mId = req.params.id;
    let u = await movieUtils.getMovieById(mId);
    res.status(200).json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.route('/:id').put(async function (req, res) {
  console.log('movie router update movie');
  try {
    const body = req.body;
    const mId = req.params.id;
    console.log('id: ', mId);
    console.log('body: ', body);
    let updated = await movieUtils.updateMovie(mId, body);
    res.status(200).json(updated);
  } catch (err) {
    console.log('error updating movie', err);
    res.status(500).json({ message: 'Cold not create: server error' });
  }
});

router.route('/').post(async function (req, res) {
  console.log('create movie');
  try {
    const body = req.body;
    console.log('create body: ', body);
    let created = await movieUtils.createMovie(body);
    res.status(200).json(created);
  } catch (err) {
    console.log('error creating movie', err);
    res.status(500).json({ message: 'Cold not create: server error' });
  }
});

//DELETE Movie
router.route('/:id').delete(async function (req, res) {
  try {
    const mId = req.params.id;
    console.log('deleting movie', mId);
    let message = await movieUtils.deleteMovie(mId);
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Error deleting - ServerError', error: err });
  }
});

module.exports = router;
