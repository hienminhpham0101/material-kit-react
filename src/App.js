import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { SnackBarProvider } from './contexts/snackBarContext';
import Router from './routes';
import CustomSnack from './shared/customSnack';
import ThemeConfig from './theme';

export default function App() {
  const [snackBar, setSnackBar] = React.useState({
    message: '',
    type: 'info',
    open: false
  });
  const { message, type, open } = snackBar;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({ ...snackBar, open: false });
  };
  return (
    <ThemeConfig>
      <SnackBarProvider value={{ snackBar, setSnackBar }}>
        <ScrollToTop />
        <Router />
        <CustomSnack open={open} message={message} type={type} onClose={handleClose} />
      </SnackBarProvider>
    </ThemeConfig>
  );
}
