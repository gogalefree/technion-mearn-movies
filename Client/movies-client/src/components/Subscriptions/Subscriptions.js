import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import { getAllSubscriptions } from '../Subscriptions/SubscriptionUtils';
import { getAllMembers } from '../Members/MembersUtils';
import { useHistory } from 'react-router-dom';
import SubscriptionCard from './SubscriptionCard';

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

export default function AllSubscriptions() {
  const classes = useStyles();
  const [subscriptions, setSubscriptions] = useState([{}]);
  const [members, setMembers] = useState([{}]);
  const history = useHistory();

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const res = await getAllSubscriptions();
        console.log('subscriptions new: ', res.data);
        setSubscriptions(res.data);
      } catch (err) {
        alert('Error connecting to server: ', err);
      }
    }

    async function fetchMembers() {
      try {
        let res = await getAllMembers();
        setMembers(res.data);
        console.log('members: ', res.data);
      } catch (err) {}
    }
    fetchSubscriptions();
    fetchMembers();
  }, []);

  const onAddMember = () => {
    history.push('/createMember');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textSecondary" className="mb-5">
        Members And Subscriptions
      </Typography>

      <Button
        variant="outlined"
        className="mb-5"
        disableElevation
        color="primary"
        onClick={onAddMember}
      >
        Add New Member
      </Button>
      <Grid container spacing={5}>
        {members &&
          members.map((m, index) => {
            let subs = subscriptions.filter((s) => s.memberId === m._id);
            return (
              <Grid item xs={6} key={index}>
                <SubscriptionCard subscriptions={subs} member={m} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
