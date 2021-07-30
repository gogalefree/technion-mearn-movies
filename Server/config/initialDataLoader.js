const axios = require('axios');
const moviesUtils = require('../models/movies/moviesUtils');
const userUtils = require('../models/user/userUtils');

//Fetch initial data on first installation

exports.fetchInitialData = async function () {
  const mvs = await moviesUtils.getAllMovies();
  if (!mvs || mvs.length === 0) {
    console.log('fetch initial data');
    fetchInitialData();
  } else {
    console.log('Data present.');
  }
};

async function fetchInitialData() {
  //Fetch and insert 20 movies
  const res = await axios.get('https://api.tvmaze.com/shows');
  const data = res.data;
  console.log('data recieved: ', data[100]);

  for (let i = 0; i < 20; i++) {
    const movie = {
      name: data[i].name,
      yearPremiered: data[i].premiered.slice(0, 4),
      imageUrl: data[i].image.medium,
      geners: data[i].genres
    };

    const createRes = await moviesUtils.createMovie(movie);
    console.log('created: ', createRes);
  }

  //Create admin user
  const user = {
    fullName: 'admin',
    userName: 'admin',
    password: 'admin'
  };

  try {
    await userUtils.createUser(user);
  } catch (err) {
    console.log('error creating initial user: ', err);
  }

  const aUser = {
    fullName: 'user',
    userName: 'user',
    password: '1234'
  };

  try {
    await userUtils.createUser(aUser);
  } catch (err) {
    console.log('error creating initial user: ', err);
  }
}
