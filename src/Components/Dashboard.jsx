import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import newTheme from './Theme';
import Logos from '../assets/image/logos.png';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Container from '@mui/material/Container';
import AccessReport from './AccessReport/AccessReport';
import AccessControl from './AccessControl/AccessControl';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { ipControl } from '../../utils/variables';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://espheratec.com/">
        Espheratec
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DashboardContent() {

  const [open, setOpen] = React.useState(true);
  const [report, setReport] = React.useState();
  const [coercao, setCoercao] = React.useState([]);
  const [controller, setController] = React.useState();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [infosBranch, setInfosBranch] = React.useState([]);




  const alert = () => {
    axios.get(`http://${ipControl}/invasion`)
      .then((response) => {
        if (response.data !== infosBranch) {
          setInfosBranch(response.data)
        }
      })
  };

  React.useEffect(() => {

    const teste = infosBranch.filter((item) => item.coercao)

    if (teste.length > 0) {
      setOpenPopup(true)
      setCoercao(teste[0])
    }
    else {
      alert()
    };

  }, [infosBranch]);

  // console.log(coercao)

  const stopAlert = async (ip) => {
    await axios.get(`http://${ipControl}/stop-alert/${ip}`)
    setOpenPopup(false)
    setCoercao([])
    setTimeout(alert, 10000)
  };

  const handleClose = () => {
    setOpenPopup(false)
  };

  const toggleDrawer = () => {
    setOpen(!open)
  };

  function showReport() {
    report ? setReport(false) : setReport(true);
  };
  function showController() {
    controller ? setController(false) : setController(true)
  };
  function setTitle() {
    if (report && !controller) {
      return 'Relatório de Acesso'
    }
    else if (!report && controller) {
      return 'Controle de Acesso'
    }
    else return null
  };

  return (

    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          ATENÇÃO
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            O AVISO DE COERÇÃO ESTÁ ATIVADO PARA A AGÊNCIA {coercao.agencia}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => stopAlert(coercao.end_ip)}
          >
            Desativar
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <ThemeProvider theme={newTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {setTitle()}
              </Typography>

              <img src={Logos} alt="Logo Santander" height={45} />
              <IconButton color="inherit">
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <React.Fragment>
                <ListItemButton onClick={() => { showReport(), setController(false) }}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Relatório de Acesso" />
                </ListItemButton>

                <ListItemButton onClick={() => { showController(), setReport(false) }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Controle de Acesso" />
                </ListItemButton>
              </React.Fragment>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {report ? <AccessReport /> : null}
              {controller ? <AccessControl /> : null}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>

    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
