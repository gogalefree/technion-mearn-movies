import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  CardActions,
  Card,
  CardMedia,
  CardHeader,
  Typography,
  CardContent,
  CardActionArea
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createMovie } from './MovieUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  
  },
  
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorStyle: {
    color: theme.palette.error.main,
    marginTop: "-15px"
  },
  image: {
    width: 500,
    height: 400,
    objectFit: 'cover'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '55vw'
  },
  card: {
    width: '60vw',
    marginTop: theme.spacing(3)
  },
  imgContainer: {
    textAlign: 'center'
  },
  deleteButton: {
    color: theme.palette.error.light
  },
  actions: {
    display: 'flex',
    justifyContent: 'left',
    marginTop: theme.spacing(3)
  },

}));

export default function CreateMovie() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [premieredYear, setPremieredYear] = useState(2020);
  const [geners, setGeners] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [nameError, setNameError] = useState(false);
  const history = useHistory();

  useEffect(() => {}, []);

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

  const onAddMovie = async () => {
    setNameError(false);
    if (name === '') {
      setNameError(true);
      return;
    }

    const movieToAdd = { name, premieredYear, imageUrl, geners };
    console.log('movie to create: ', movieToAdd);
    try {
      await createMovie(movieToAdd);
      history.push('/');
    } catch (err) {
      console.log(err);
      alert('Could not create movie due to network error');
    }
  };

  return (
    <div className={classes.paper}>
      <Card className={classes.card} variant="outlined">
        <CardHeader title={name === '' ? 'ADD MOVIE' : name} />
        {imageUrl === '' ? null : (
          <CardMedia
            component="img"
            alt={name}
            height="400"
            image={imageUrl}
            title={name}
          />
        )}
        {/* <div className={classes.paper}> */}
        <CardContent>
          {/* <form noValidate autoComplete="off"> */}
          <TextField
            fullWidth
            id="name"
            label="Movie Title"
            value={name}
            onChange={onTitleChanged}
            className={classes.textField}
            error={nameError}
            required={true}
            margin="normal"
            
          />
          {nameError && <div className={classes.errorStyle} ><small >Title is required</small></div>}

          <TextField
            fullWidth
            id="year"
            type="number"
            label="Year Premiered"
            value={premieredYear}
            onChange={(e) => setPremieredYear(e.target.value)}
            className={classes.textField}
          />
          <TextField
            fullWidth
            id="Geners"
            label="Geners - Put a Comma between Geners"
            className={classes.textField}
            value={geners.join(', ')}
            onChange={(e) => setGeners(e.target.value.split(', '))}
          />
          <TextField
            fullWidth
            id="imageUrl"
            label="Image Url"
            className={classes.textField}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <CardActions className={classes.actions}>
            {/* <div className={classes.actions}> */}
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className="mb-3"
                onClick={onAddMovie}
              >
                ADD MOVIE
              </Button>

              <Button
                size="small"
                color="secondary"
                className="mb-3 ml-4"
                variant="outlined"
                onClick={onCancel}
              >
                CANCEL
              </Button>
            {/* </div> */}
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
