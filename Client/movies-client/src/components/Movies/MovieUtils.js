import axios from 'axios';
//Change before production build
export const baseURL = 'http://localhost:8080';
//export const baseURL = '';

export function getAllMovies() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/movies';
      const res = await axios.get(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function updateMovie(movie) {
  console.log('updateing', movie);
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/movies/' + movie._id;
      const headers = {
        'Content-Type': 'application/json'
      };

      const res = await axios.put(url, movie, { headers });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function createMovie(movie) {
  console.log('creating', movie);
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/movies';
      const headers = {
        'Content-Type': 'application/json'
      };

      const res = await axios.post(url, movie, { headers });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteMovie(mId) {
  console.log('Deleting movie with id: ', mId);
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/movies/' + mId;
      console.log('delete url: ', url);
      const res = await axios.delete(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchMoviesNotSeen(moviesSeenIds) {
  return new Promise(async (resolve, reject) => {
    try {
      const seenIds = Array.from(moviesSeenIds);
      const res = await getAllMovies();
      const allMovies = res.data;
      let notSeen = allMovies.filter((m) => !seenIds.includes(m._id));
      console.log('not seen movies: ', notSeen);
      resolve(notSeen);
    } catch (getMoviesError) {
      alert('Couldnt fetch all movies', getMoviesError);
      reject(getMoviesError);
    }
  });
}

export function fetchMovieWith(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = baseURL + '/api/movies/' + id;
      const res = await axios.get(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
