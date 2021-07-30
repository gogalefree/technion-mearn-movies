import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, CardActions, Card, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createMember } from './MembersUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  errorStyle: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(3)
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
  }
}));

export default function CreateMember(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const onNameChanged = (e) => {
    setNameError(false);
    setName(e.target.value);
    if (e.target.value === '') {
      setNameError(true);
    }
  };
  const onEmailChanged = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
    if (e.target.value === '') {
      setEmailError(true);
    }
  };

  const onCancel = () => {
    props.history.goBack();
  };

  const onCreate = async () => {
    setNameError(false);
    if (name === '') {
      setNameError(true);
      return;
    }

    const memberToCreate = {
      fullName: name,
      email: email,
      city: city
    };

    try {
      let res = await createMember(memberToCreate);
      history.push('/subscriptions');
    } catch (err) {
      console.log(err);
      alert('Could not create member due to network error');
    }
  };

  return (
    <div className={classes.paper}>
      <Card className={classes.card} raised={true}>
        <CardHeader title={`Create New Member`} className="mt-3" />

        <div className={classes.paper}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              id="name"
              label="Member Name"
              value={name}
              onChange={onNameChanged}
              className={classes.textField}
              error={nameError}
            />

            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={onEmailChanged}
              className={classes.textField}
              error={emailError}
            />

            <TextField
              fullWidth
              id="city"
              label="City"
              className={classes.textField}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className="mb-3"
                onClick={onCreate}
                disabled={nameError || emailError || name === ''}
              >
                Create
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
