import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

MHidden.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf([
    'xsDown',
    'smDown',
    'mdDown',
    'lgDown',
    'xlDown',
    'xsUp',
    'smUp',
    'mdUp',
    'lgUp',
    'xlUp'
  ]).isRequired
};

export default function MHidden({ width, children }) {
  const breakpoint = width.substring(0, 2);
  const theme = useTheme();
  const hiddenUp = useMediaQuery(theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery(theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}
