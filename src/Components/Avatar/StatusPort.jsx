import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';;

export default function StatusPort(props) {
  return (     
    <Box sx={{display: 'flex', gap: 1, alignContent:'center'}}>
      <CircleIcon  sx={{ color: props.color, width: 20, height: 20 }}/>     
      <Typography
        variant='subtitle'
      >
        {props.texto} 
      </Typography>
    </Box>
    
  );
}