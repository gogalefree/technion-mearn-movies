import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { CardHeader } from '@material-ui/core';
import MovieSubscriptionRow from './MovieSubscriptionRow';
import AddSubDialog from './AddSubDialog';
import { fetchMoviesNotSeen } from '../Movies/MovieUtils';
import DeleteMemberDialog from './DeleteMemberDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500
    //minHeight: 440
  },
  deleteButton: {
    color: theme.palette.error.dark
  },
  addSubButton: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  subTitle: {
    color: theme.palette.grey[800],
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1)
  }
}));

export default function SubscriptionCard({ subscriptions, member }) {
  const classes = useStyles();
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [moviesNotSeen, setMoviesNotSeen] = useState([{}]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {}, [subscriptions, member]);

  //Called by AddSubDialog
  const didCloseModal = (shouldReload) => {
    if (shouldReload) {
      window.location.reload();
    }
    setDialogOpen(false);
  };

  const onEditMember = () => {
    localStorage.setItem('member', JSON.stringify(member));
    let mId = member._id;
    let url = `/editMember/${mId}`;
    history.push(url);
  };

  const onDelete = async () => {
    setShowDeleteDialog(true);
  };

  const onDeleteDialofFinished = (shouldReload) => {
    setShowDeleteDialog(false);
    if (shouldReload) {
      window.location.reload();
    }
  };
  const onAddSub = async () => {
    if (subscriptions) {
      const ids = subscriptions.map((s) => s.moviesId);
      const uniqe = new Set(ids);
      try {
        console.log('fetch not seen');
        const moviesNS = await fetchMoviesNotSeen(uniqe);
        setMoviesNotSeen(moviesNS);
        setDialogOpen(true);
      } catch (err) {
        console.log('error getting movies not seen', err);
      }
    }
  };

  return (
    <>
      <Card className={classes.root} raised={true}>
        <CardHeader type="title" title={member.fullName} />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            {member.city}
          </Typography>
          <Typography gutterBottom variant="body1" component="h2">
            {member.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={onEditMember}>
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

        <hr></hr>

        <Typography variant="h6" className={classes.subTitle}>
          {subscriptions.length > 0
            ? 'SUBSCRIPTIONS WATCHED'
            : 'NO SUBSCRIPTIONS YET'}
        </Typography>

        <Button
          size="small"
          className={classes.addSubButton}
          onClick={onAddSub}
        >
          Add Subscription
        </Button>

        <AddSubDialog
          isOpen={dialogOpen}
          name={member.fullName}
          movies={moviesNotSeen}
          didClose={didCloseModal}
          memberId={member._id}
        />

       {subscriptions && subscriptions.map((s, index) => {
          return <MovieSubscriptionRow subscription={s} key={index} />;
        })}
       
      </Card>

      <DeleteMemberDialog
        open={showDeleteDialog}
        didFinish={onDeleteDialofFinished}
        member={member}
      />
    </>
  );
}
