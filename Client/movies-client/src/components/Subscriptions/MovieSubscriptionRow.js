import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'middle',
    marginTop: '10px',
    marginBottom: '10px'
  },

  details: {
    display: 'flex',
    flexDirection: 'column'
  },

  cover: {
    width: 40,
    height: 50,
    marginLeft: theme.spacing(1)
  }
}));

export default function MovieSubscriptionRow({ subscription = {} }) {
  const classes = useStyles();
  const history = useHistory();

  const readableDate = (strInt) => {
    console.log('readable date: ', strInt);
    const utcSeconds = parseInt(strInt);
    var current = new Date(0);
    current.setUTCSeconds(utcSeconds);
    const tstr = current.toString();
    return tstr.slice(3, 15);
  };

  useEffect(() => {
    if (subscription) {
      console.log(subscription);
    }
  }, []);

  const handleMovieClick = () => {
    const url = '/movieDetails/' + subscription.moviesId;
    history.push(url);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        component="img"
        alt={subscription.name}
        height="50"
        image={subscription.movieUrl}
        title={subscription.movieName}
        className={classes.cover}
      />
      <div className={classes.details}>
        <CardContent>
          <Typography variant="body2" component="h6">
            <Link onClick={handleMovieClick}>{subscription.movieName} </Link>,{' '}
            {readableDate(subscription.date)}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
