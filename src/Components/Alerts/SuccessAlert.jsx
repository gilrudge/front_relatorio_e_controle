import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SuccessAlert(props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>      
      <Alert severity="success">{props.textSuccess}</Alert>
    </Stack>
  );
}