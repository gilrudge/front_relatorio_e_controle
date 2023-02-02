import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading(props) {
  return (
    <Box sx={{ display: 'flex', width: props.width }}>
      <CircularProgress />
    </Box>
  );
}