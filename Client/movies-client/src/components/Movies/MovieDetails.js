import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieWith } from './MovieUtils';
import MovieCard from './MovieCard';
import { getAllSubscriptions } from '../Subscriptions/SubscriptionUtils';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default function MovieDetails(props) {
  const [movie, setMovie] = useState({});
  const [subs, setSubs] = useState([{}]);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchMovieWith(id);
        setMovie(res.data);
      } catch (error) {
        alert('Server error. Could not fetch movie data');
      }
    }

    async function getSubs() {
      try {
        const res = await getAllSubscriptions();
        let s = res.data.filter((subs) => subs.moviesId === id);
        setSubs(s);
        console.log('subs: ', s);
      } catch (error) {
        alert('Server error. Could not fetch movie data');
      }
    }
    getData();
    getSubs();
  }, [id]);

  const onBack = () => {
    props.history.goBack();
  };
  return (
    <>
      {movie && (
        <Typography align="center" variant="h4" style={{ marginTop: '20px' }}>
          {movie.name} - Details:
        </Typography>
      )}
      <div
        style={{
          width: '100%%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {subs && <MovieCard movie={movie} subscriptions={subs} />}
      </div>

      <div
        style={{
          width: '100%%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
      </div>
    </>
  );
}
