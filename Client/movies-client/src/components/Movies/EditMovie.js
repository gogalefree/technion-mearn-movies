import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  CardActions,
  Card,
  CardMedia,
  CardHeader,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { updateMovie } from './MovieUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: 500, // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorStyle: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(3)
  },
  image: {
    width: 500,
    height: 400,
    objectFit: 'cover'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  card: {
    width: '50vw',
    marginTop: theme.spacing(3)
  },
  imgContainer: {
    textAlign: 'center'
  },
  deleteButton: {
    color: theme.palette.error.light
  }
}));

export default function EditMovie() {
  const classes = useStyles();
  const [movie, setMovie] = useState({});
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [geners, setGeners] = useState([]);
  const [nameError, setNameError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const m = JSON.parse(localStorage.getItem('movie'));
    console.log('m:', m);
    setMovie(m);
    setName(m.name);
    setYear(m.yearPremiered);
    setGeners(m.geners);
  }, []);

  const onTitleChanged = (e) => {
    setNameError(false);
    setName(e.target.value);
    if (e.target.value === '') {
      setNameError(true);
    }
  };

  const onCancel = () => {
    history.push('/');
  };

  const onUpdate = async () => {
    setNameError(false);
    if (name === '') {
      setNameError(true);
      return;
    }

    const movieToUpdate = { ...movie, name, yearPremiered: parseInt(year), geners };
    console.log('movie to update: ', movieToUpdate);
    try {
      await updateMovie(movieToUpdate);
      history.push('/');
    } catch (err) {
      console.log(err);
      alert('Could not update movie due to network error');
    }
  };

  return (
     <div className={classes.paper}>
    <Card className={classes.card}>
      <CardHeader title={movie.name ? movie.name.toUpperCase() : ''} />
      <CardMedia
        component="img"
        alt={movie.name}
        height="400"
        image={movie.imageUrl}
        title={movie.name}
      />

      <div className={classes.paper}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            id="name"
            label="Movie Title"
            value={name}
            onChange={onTitleChanged}
            className={classes.textField}
            error={nameError}
          />
    
          <TextField
            fullWidth
            id="year"
            type="number"
            label="Year Premiered"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={classes.textField}
          />
          <TextField
            fullWidth
            id="Geners"
            label="Put a Comma between Geners"
            className={classes.textField}
            value={geners.join(', ')}
            onChange={(e) => setGeners(e.target.value.split(', '))}
          />
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className="mb-3"
              onClick={onUpdate}
            >
              Update
            </Button>

            <Button
              size="small"
              color="secondary"
              className="mb-3 ml-4"
              variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </div>
    </Card>
     </div>
  );
}
