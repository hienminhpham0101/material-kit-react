import { Alert, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function CustomSnack({ message, type, open, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

CustomSnack.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
