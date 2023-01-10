import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function MenuList(props) {

  return (
    <>
      <React.Fragment>
        <ListItemButton onClick={props.event}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Relatório de Acesso"/>
        </ListItemButton>
        <ListItemButton onClick={()=> {showController()}}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Controle de Acesso" />
        </ListItemButton>
      </React.Fragment>
    </>
  )
};