import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createSubscription } from './SubscriptionUtils';

import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}  />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    minWidth: 150
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 200
  }
}));

export default function AddSubDialog({
  isOpen,
  name,
  memberId,
  movies,
  didClose
}) {
  const classes = useStyles();
  const [movieDate, setMovieDate] = React.useState('');
  const [movieId, setMovieId] = React.useState('');
  const [movieName, setMovieName] = React.useState('');
  let isLoading = false;

  const handleSubscribe = async () => {
    if (movieId === '' || movieDate === '') {
      alert('Movie and date must be picked');
      return;
    }
    isLoading = true;
    console.log('memberId' , memberId);
    const sub = {
      memberId: memberId,
      moviesId: movieId,
      date: movieDate
    };

    try {
      let s = await createSubscription(sub);
      isLoading = false;
      didClose(true);
    } catch (err) {
      alert('Server Error: Subscription Not Created');
      isLoading = false;
    }
  };

  const handleCancel = () => {
    didClose(false);
  };

  //called when the user taps outside the Modal
  const handleClose = () => {
    if (!isLoading) {
      didClose(false);
    }
  };

  const handleMovieChanged = (event) => {
    const subMovieId = event.target.value;
    setMovieName(subMovieId);
    setMovieId(subMovieId);
  };

  const handleDateChange = (e) => {
    let dateString = e.target.value;
    let date = new Date(dateString);
    let epoch = parseInt(Number(date) / 1000); //turn millisconds to seconds
    setMovieDate(parseInt(epoch));
    console.log('date string: ' , dateString);
    console.log('date: ' , date);
    console.log('epoch: ' , epoch);
  };

  let items = [];

  if (movies) {
    items = movies.map((m, index) => {
      return (
        <MenuItem key={index} value={m._id}>
          {m.name}
        </MenuItem>
      );
    });
  }
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="add-sub-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="add-sub-dialog-title">
          Add Subscription - {name}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
          </DialogContentText> */}
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="movie-name">Movie To Watch</InputLabel>
              <Select
                autoFocus
                value={movieName}
                onChange={handleMovieChanged}
                inputProps={{
                  name: 'movie-name',
                  id: 'movie-name'
                }}
              >
                {items}
              </Select>
            </FormControl>

            <TextField
              id="date"
              label="Subscription Date"
              type="date"
              defaultValue={movieDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleDateChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubscribe}
            color="primary"
            disabled={movieId === '' || movieDate === ''}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
