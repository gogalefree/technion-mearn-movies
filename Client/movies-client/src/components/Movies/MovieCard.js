import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { deleteMovie } from './MovieUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    minHeight: 440
  },
  deleteButton: {
    color: theme.palette.error.dark
  }
}));

export default function MovieCard({ movie, subscriptions }) {
  const classes = useStyles();
  const [geners, setGeners] = useState('');

  useEffect(() => {
    if (movie.geners) {
      setGeners(movie.geners.join(', '));
    }
  }, [geners, movie.geners]);

  const [dates, setDates] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (subscriptions) {
      const datesStr = subscriptions.map((d) => {
        const utcSeconds = parseInt(d.date);
        var current = new Date(0);
        current.setUTCSeconds(utcSeconds);
        const tstr = current.toString();
        return tstr.slice(3, 15);
      });

      setDates(datesStr);
    }
  }, [subscriptions]);

  const onEditMovie = () => {
    localStorage.setItem('movie', JSON.stringify(movie));
    const url = '/editMovie/' + movie._id;
    history.push(url);
  };

  const onDelete = async () => {
    const mId = movie._id;
    try {
      await deleteMovie(mId);
      window.location.reload();
    } catch (err) {
      console.log('error: ', err);
      alert('Could not delete due to server Error.');
    }
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={movie.name}
        height="300"
        image={movie.imageUrl}
        title={movie.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.name}, {movie.yearPremiered}
        </Typography>
        <Typography gutterBottom variant="body1" component="h2">
          Geners: {geners}
        </Typography>
        {subscriptions.length > 0 ? (
          <Typography gutterBottom variant="body1" component="h2">
            Subscriptions Watched:
          </Typography>
        ) : (
          <Typography gutterBottom variant="body1" component="h2">
            No Subscriptions watched yet
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" component="h2">
          <ul>
            {subscriptions.map((s, index) => {
              return (
                <li key={index}>
                  {s.fullName}, {dates[index]}
                </li>
              );
            })}
          </ul>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onEditMovie}>
          Edit
        </Button>

        <Button
          size="small"
          className={classes.deleteButton}
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
