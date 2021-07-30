import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteMember } from '../Members/MembersUtils';

export default function DeleteMemberDialog({ open, didFinish, member }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    didFinish(false);
  };

  const handleDelete = async () => {
    console.log('delete: ', member._id);
    setLoading(true);
    const mId = member._id;
    try {
      let res = await deleteMember(mId);
      setLoading(false);
      didFinish(true);
    } catch (err) {
      console.log('error: ', err);
      alert('Could not delete due to server Error.');
    }
  };
  const handleClose = () => {
    if (!loading) {
      didFinish(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete ${member.fullName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the member and all of their subscriptions. This
            operation can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
