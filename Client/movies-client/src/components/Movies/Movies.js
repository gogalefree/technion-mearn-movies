import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import { getAllMovies } from './MovieUtils';
import { getAllSubscriptions } from '../Subscriptions/SubscriptionUtils';
import MovieCard from './MovieCard';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function Movies() {
  const classes = useStyles();
  const [movies, setMovies] = useState([{}]);
  const [subscriptions, setSubscriptions] = useState([{}]);
  const history = useHistory();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await getAllMovies();
        setMovies(res.data);
      } catch (err) {
        alert('Error connecting to server: ', err);
      }
    }

    async function fetchSubscriptions() {
      try {
        const res = await getAllSubscriptions();
        setSubscriptions(res.data);
      } catch (err) {
        alert('Error connecting to server: ', err);
      }
    }

    fetchMovies();
    fetchSubscriptions();
  }, []);

  const onAddMovie = () => {
    history.push('/createMovie');
  };

  const movieGridItems = movies.map((m, index) => {
    console.log(m._id);
    return (
      <Grid item xs={6} key={index}>
        <MovieCard
          movie={m}
          subscriptions={subscriptions.filter((s) => s.moviesId === m._id)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textSecondary" className="mb-5">
        Movies List
      </Typography>

      <Button
        variant="outlined"
        className="mb-5"
        disableElevation
        color="primary"
        onClick={onAddMovie}
      >
        Add New Movie
      </Button>
      <Grid container spacing={5}>
        {movieGridItems}
      </Grid>
    </div>
  );
}
