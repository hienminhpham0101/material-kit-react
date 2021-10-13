import { useMutation } from '@apollo/client';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { SnackBarContext } from '../../contexts/snackBarContext';
import { DELETE_POSTS, GET_POSTS } from '../../services/posts/queries.post';

export default function ConfirmDialog({ selectedRows, handleClose, onFinish }) {
  const { setSnackBar } = useContext(SnackBarContext);

  const [deletePost] = useMutation(DELETE_POSTS, {
    refetchQueries: [GET_POSTS]
  });

  const handleDeletePosts = () => {
    deletePost({ variables: { ids: selectedRows } })
      .then((result) => {
        const { data, message } = result;
        if (data) {
          setSnackBar({
            open: true,
            message: 'Deleted successfully !',
            type: 'success'
          });
          handleClose();
          onFinish();
        } else {
          setSnackBar({
            open: true,
            message,
            type: 'error'
          });
        }
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: err.message,
          type: 'error'
        });
      });
  };
  return (
    <>
      <DialogTitle>Are you sure ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{selectedRows.length}</strong> post(s)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeletePosts} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </>
  );
}

ConfirmDialog.propTypes = {
  selectedRows: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
};
