import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';;

export default function StatusIcon(props) {
  return (     
    <Box sx={{display: 'flex', gap: 1, alignContent:'center'}}>
      <Typography
        variant='h6'
      >
        Status Agência: 
      </Typography>
      <CircleIcon  sx={{ color: props.color, width: 30, height: 30 }}/>     
    </Box>
    
  );
}