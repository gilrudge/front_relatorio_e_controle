import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Title from '../Title';
import axios from 'axios';
import {
  validateBankName, validateBranchNumber, validateBranchName,
  validateIp, validatePort, validateNetworkMask,
  validateDnsAdress, validateGateway, validateIpFixoDhcp,
  validateMacAdress, validateHour, validateReconPort
} from '../../../utils/validate';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../Alerts/SuccessAlert';
import DenyAlert from '../Alerts/DenyAlert';
import StatusPort from '../Avatar/StatusPort';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} /> ))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  marginRight: -5,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default function CommandsControl(props) {

  //Endpoints comandos
  const endPointCommand = `http://localhost:4002/enable-door/${props.data.end_ip}`
  const endPointPort = `http://localhost:4002/open-door/${props.data.end_ip}`
  const endPointHour = `http://localhost:4002/hour-door/${props.data.end_ip}`
  const endPointFacial = `http://localhost:4002/facial-rec/${props.data.end_ip}`
    
  //Estado Habilita/Desabilita portas
  const [enableMain, setEnableMain] = React.useState(props.infosAndStatus[0].H1_);
  const [enableATM, setEnableATM] = React.useState(props.infosAndStatus[0].H3_);
  const [enableSteel, setEnableSteel] = React.useState(props.infosAndStatus[0].H4_);
  const [enableAccessibility, setEnableAccessibility] = React.useState(props.infosAndStatus[0].H2_);
  const [enableFacial, setEnableFacial] = React.useState(props.infosAndStatus[0].HF_);
  
  // Estado horário de abertura portas
  const [openHourMain, setOpenHourMain] = React.useState();
  const [openHourAccessibility, setOpenHourAccessibility] = React.useState();
  const [openHourATM, setOpenHourATM] = React.useState();
  const [openHourSteel, setOpenHourSteel] = React.useState();
  
  //Estado horário fechamento portas
  const [closeHourMain, setCloseHourMain] = React.useState();
  const [closeHourAccessibility, setCloseHourAccessibility] = React.useState();
  const [closeHourATM, setCloseHourATM] = React.useState();
  const [closeHourSteel, setCloseHourSteel] = React.useState();

  //Função habilita/desabilita portas
  const changeEnableMain = (event) => {
    setEnableMain(event.target.checked);
    if(!enableMain){
      axios.get(`${endPointCommand}/1/1`)
    } else {
      axios.get(`${endPointCommand}/1/0`)
    }  
  }; 
  const changeEnableAccessibility = (event) => {
    setEnableAccessibility(event.target.checked);
    if(!enableAccessibility){
      axios.get(`${endPointCommand}/2/1`)
    } else {
      axios.get(`${endPointCommand}/2/0`)
    }  
  };
  const changeEnableATM = (event) => {
    setEnableATM(event.target.checked);
    if(!enableATM){
      axios.get(`${endPointCommand}/3/1`)
    } else {
      axios.get(`${endPointCommand}/3/0`)
    }  
  };
  const changeEnableSteel = (event) => {
    setEnableSteel(event.target.checked);
    if(!enableSteel){
      axios.get(`${endPointCommand}/4/1`)
    } else {
      axios.get(`${endPointCommand}/4/0`)
    }  
  };
  const changeEnableFacial = (event) => {
    setEnableFacial(event.target.checked);
    if(!enableFacial){
      axios.get(`${endPointCommand}/F/1`)
    } else {
      axios.get(`${endPointCommand}/F/0`)
    }  
  };
  
  //Função horário abertura portas
  const onSubmitOpenMain = async (data) => {
    await axios.get(`${endPointHour}/CA/${openHourMain}`)
    // handleClick()
  };
  const onSubmitOpenAccessibility = async (data) => {
    await axios.get(`${endPointHour}/CA/${openHourAccessibility}`)
    // handleClick()
  };
  const onSubmitOpenATM = async (data) => {
    await axios.get(`${endPointHour}/CA/${openHourATM}`)
    // handleClick()
  };
  const onSubmitOpenSteel = async (data) => {
    await axios.get(`${endPointHour}/AA/${openHourSteel}`)
    // handleClick()
  };
  
  //Função horário fechamento portas
  const onSubmitCloseMain = async (data) => {
    await axios.get(`${endPointHour}/CF/${closeHourMain}`)
    // handleClick()
  };
  const onSubmitCloseAccessibility = async (data) => {
    await axios.get(`${endPointHour}/CF/${closeHourAccessibility}`)
    // handleClick()
  };
  const onSubmitCloseATM = async (data) => {
    await axios.get(`${endPointHour}/CF/${closeHourATM}`)
    // handleClick()
  };
  const onSubmitCloseSteel = async (data) => {
    await axios.get(`${endPointHour}/AF/${closeHourSteel}`)
    // handleClick()
  };
  
  //Função abrir portas
  const openDoor = async (port) => {
    await axios.get(`${endPointPort}/${port}`)
  };

  //Função fechar portas
  const closeDoor = async (port) => {
    await axios.get(`${endPointPort}/${port}`)
  };

  //Função parar portas
  const stopDoor = async (port) => {
    await axios.get(`${endPointPort}/${port}`)
  };
  
  //Função porta reconhecimento facial
  const facialRec = async (port) => {
    await axios.get(`${endPointFacial}/${port}`)
  };
  
  //ALERTS
  // const [successAlert, setSuccessAlert] = React.useState();
  // const [denyAlert, setDenyAlert] = React.useState();
  
  // const showSuccessAlert = () => successAlert ? setSuccessAlert(false) : setSuccessAlert(true);
  // const showdenyAlert = () => denyAlert ? setDenyAlert(false) : setDenyAlert(true);
   
  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    defaultValues: {
      openHourATM:props.infosAndStatus[0].CA_,      
      openHourSteel:props.infosAndStatus[0].AA_,      
    }
  });  
  
  return (
    <>
      <Box sx={{ mb: 4 }} style={{ borderBottom: '1px solid #ddd' }}>
        <Title>Comandos</Title>
        
        <Box 
          sx={{ mt: 4, mr: 1, mb: 4, ml: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
          >
          
          {/* Start Porta Principal */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', borderBottom: '1px solid #333', paddingBottom: '30px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}>
              <Typography sx={{ fontWeight: '700' }}>
                Porta Principal
              </Typography>
              {props.infosAndStatus[0].S1_ ? <StatusPort color='red' texto='Fechada'></StatusPort> :
                <StatusPort color='green' texto='Aberta'></StatusPort>}
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '55px' }}>
              <Box sx={{'& .MuiButton-root': {width: '10ch', height: '5ch', mr: 1} }}>
                <Button onClick={()=>{openDoor(1)}} variant="contained">Abrir</Button>
                <Button disabled variant="contained">Fechar</Button>
                <Button disabled variant="contained">Parar</Button>
              </Box>
              <Box sx={{ 
                gap: 2, 
                '& .MuiTextField-root': {width: '20ch', mr: 1},
                '& .MuiButton-root': {height: '5ch', mr: 1} }}
                style={{ display: 'flex' }}>
                <Box
                  component='form'
                  noValidate
                  autoComplete="off"
                >            
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Abertura"                
                    type="text"
                    {...register("openHourMain", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setOpenHourMain(e.target.value)}
                    error={!!errors?.openHourMain}
                    helperText={errors?.openHourMain ? errors.openHourMain.message : null}
                  />
                  <Button
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
                <Box
                  component='form'
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Fechamento"                
                    type="text"
                    {...register("closeHourMain", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setCloseHourMain(e.target.value)}
                    error={!!errors?.closeHourMain}
                    helperText={errors?.closeHourMain ? errors.closeHourMain.message : null}
                  />
                  <Button
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
              </Box>
              <Box sx={{display:  'flex', '& .MuiTypography-root': {mt: 1} }}>
                <Typography sx={{ mr: 3 }}>
                  Desabilitar
                </Typography>
                <FormControlLabel
                  control={
                  <IOSSwitch 
                    checked={props.infosAndStatus[0].H1_}
                    onChange={changeEnableMain}/>}
                />
                <Typography>
                  Habilitar
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* End Porta Principal */}

          {/* Start Porta Acessibilidade */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', borderBottom: '1px solid #333', paddingBottom: '30px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}>
              <Typography sx={{ fontWeight: '700' }}>
                Porta Acessibilidade
              </Typography>
              {props.infosAndStatus[0].S2_ ? <StatusPort color='red' texto='Fechada'></StatusPort> :
                <StatusPort color='green' texto='Aberta'></StatusPort>}
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '55px' }}>
              <Box sx={{'& .MuiButton-root': {width: '10ch', height: '5ch', mr: 1} }}>
                <Button onClick={()=>{openDoor(2)}} variant="contained">Abrir</Button>
                <Button disabled variant="contained">Fechar</Button>
                <Button disabled variant="contained">Parar</Button>
              </Box>
              <Box sx={{ 
                gap: 2, 
                '& .MuiTextField-root': {width: '20ch', mr: 1},
                '& .MuiButton-root': {height: '5ch', mr: 1} }}
                style={{ display: 'flex' }}>
                <Box
                  component='form'
                  noValidate
                  autoComplete="off"
                >            
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Abertura"                
                    type="text"
                    {...register("openHourAccessibility", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setOpenHourAccessibility(e.target.value)}
                    error={!!errors?.openHourAccessibility}
                    helperText={errors?.openHourAccessibility ? errors.openHourAccessibility.message : null}
                  />
                  <Button 
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
                <Box
                  component='form'
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Fechamento"                
                    type="text"
                    {...register("closeHourAccessibility", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setCloseHourAccessibility(e.target.value)}
                    error={!!errors?.closeHourAccessibility}
                    helperText={errors?.closeHourAccessibility ? errors.closeHourAccessibility.message : null}
                  />
                  <Button 
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
              </Box>
              <Box sx={{display:  'flex', '& .MuiTypography-root': {mt: 1} }}>
                <Typography sx={{ mr: 3 }}>
                  Desabilitar
                </Typography>
                <FormControlLabel
                  control={
                  <IOSSwitch 
                      checked={props.infosAndStatus[0].H2_}
                      onChange={changeEnableAccessibility} />
                    }
                />
                <Typography>
                  Habilitar
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* End Porta Acessibilidade */}
          

          {/* Start Porta Caixas */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', borderBottom: '1px solid #333', paddingBottom: '30px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}>
              <Typography sx={{ fontWeight: '700' }}>
                Porta Caixas
              </Typography>
              {props.infosAndStatus[0].S3_ ? <StatusPort color='red' texto='Fechada'></StatusPort> :
                <StatusPort color='green' texto='Aberta'></StatusPort>}
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '55px' }}>
              <Box sx={{'& .MuiButton-root': {width: '10ch', height: '5ch', mr: 1} }}>
                <Button onClick={()=>{openDoor(3)}}variant="contained">Abrir</Button>
                <Button disabled variant="contained">Fechar</Button>
                <Button disabled variant="contained">Parar</Button>
              </Box>
              <Box sx={{ 
                gap: 2, 
                '& .MuiTextField-root': {width: '20ch', mr: 1},
                '& .MuiButton-root': {height: '5ch', mr: 1} }}
                style={{ display: 'flex' }}>
                <Box
                  component='form'
                  onSubmit={handleSubmit(onSubmitOpenATM)}
                  noValidate
                  autoComplete="off"
                >            
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Hora de Abertura"
                    type="text"
                    {...register("openHourATM", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setOpenHourATM(e.target.value)}
                    error={!!errors?.openHourATM}
                    helperText={errors?.openHourATM ? errors.openHourATM.message : null}
                  />
                  <Button 
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
                <Box
                  component='form'
                  onSubmit={handleSubmit(onSubmitCloseATM)}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Fechamento"                
                    type="text"
                    {...register("closeHourATM", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setCloseHourATM(e.target.value)}
                    error={!!errors?.closeHourATM}
                    helperText={errors?.closeHourATM ? errors.closeHourATM.message : null}
                  />
                  <Button 
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
              </Box>
              <Box sx={{display:  'flex', '& .MuiTypography-root': {mt: 1} }}>
                <Typography sx={{ mr: 3 }}>
                  Desabilitar
                </Typography>
                <FormControlLabel
                  control={
                  <IOSSwitch 
                      checked={props.infosAndStatus[0].H3_}
                      onChange={changeEnableATM} />
                    }
                    />
                <Typography>
                  Habilitar
                </Typography>
              </Box>

            </Box>
          </Box>
          {/* End Porta Caixas */}

          {/* Start Porta Aço */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', borderBottom: '1px solid #333', paddingBottom: '30px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}>
              <Typography sx={{ fontWeight: '700' }}>
                Porta Aço
              </Typography>
              {props.infosAndStatus[0].S4_ ? <StatusPort color='red' texto='Fechada'></StatusPort> :
                <StatusPort color='green' texto='Aberta'></StatusPort>}
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '55px' }}>
              <Box sx={{'& .MuiButton-root': {width: '10ch', height: '5ch', mr: 1} }}>
                <Button onClick={()=>{openDoor(4)}} variant="contained">Abrir</Button>
                <Button onClick={()=>{closeDoor(6)}} variant="contained">Fechar</Button>
                <Button onClick={()=>{stopDoor(5)}} variant="contained">Parar</Button>
              </Box>
              <Box sx={{ 
                gap: 2, 
                '& .MuiTextField-root': {width: '20ch', mr: 1},
                '& .MuiButton-root': {height: '5ch', mr: 1} }}
                style={{ display: 'flex' }}>
                <Box
                  component='form'
                  onSubmit={handleSubmit(onSubmitOpenSteel)}
                  noValidate
                  autoComplete="off"
                >            
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Hora de Abertura"                
                    type="text"
                    {...register("openHourSteel", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setOpenHourSteel(e.target.value)}
                    error={!!errors?.openHourSteel}
                    helperText={errors?.openHourSteel ? errors.openHourSteel.message : null}
                  />
                  <Button 
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
                <Box
                  component='form'
                  onSubmit={handleSubmit(onSubmitCloseSteel)}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    size="small"
                    variant="outlined"
                    label="Hora de Fechamento"                
                    type="text"
                    {...register("closeHourSteel", {
                      pattern: {
                        value: validateHour,
                        message: "Horário inválido"
                      }
                    })}
                    onChange={(e) => setCloseHourSteel(e.target.value)}
                    error={!!errors?.closeHourSteel}
                    helperText={errors?.closeHourSteel ? errors.closeHourSteel.message : null}
                  />
                  <Button 
                    disabled
                    variant="outlined"
                    type='submit'
                  >Ok</Button>
                </Box>
              </Box>
              <Box sx={{display:  'flex', '& .MuiTypography-root': {mt: 1} }}>
                <Typography sx={{ mr: 3 }}>
                  Desabilitar
                </Typography>
                <FormControlLabel
                  control={
                  <IOSSwitch 
                      checked={props.infosAndStatus[0].H4_}
                      onChange={changeEnableSteel} />
                    }
                />
                <Typography>
                  Habilitar
                </Typography>
              </Box>

            </Box>
          </Box>
          {/* End Porta Aço */}

          {/* Start Reconhecimento Facial */}
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '30px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '300px' }}>
              <Typography sx={{ fontWeight: '700' }}>
                Reconhecimento Facial
              </Typography>
                {/* <StatusPort color='green' texto={props.statusPorts["@PF_"]}></StatusPort> */}
                <Typography>
                  {props.infosAndStatus[0].PF_ === 1 ? "Principal" : "Acessibilidade"}
                </Typography>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '250px' }}>
              <Box sx={{'& .MuiButton-root': {width: '19.7ch', height: '5ch', mr: 1} }}>
                <Button onClick={()=>{facialRec(1), props.getStatusPorts()}} variant="contained">Principal</Button>
                <Button onClick={()=>{facialRec(2), props.getStatusPorts()}} variant="contained">Acessibilidade</Button>
                <Button disabled onClick={()=>{facialRec(3), props.getStatusPorts()}} variant="contained">Caixas</Button>
                <Button disabled onClick={()=>{facialRec(4), props.getStatusPorts()}} variant="contained">Aço</Button>
              </Box>
              
              <Box sx={{display:  'flex', '& .MuiTypography-root': {mt: 1} }}>
                <Typography sx={{ mr: 3 }}>
                  Desabilitar
                </Typography>
                <FormControlLabel
                  control={
                  <IOSSwitch 
                      checked={props.infosAndStatus[0].HF_}
                      onChange={changeEnableFacial} />
                    }
                />
                <Typography>
                  Habilitar
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* End Reconhecimento Facial */}

          {/* {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
          {denyAlert ? <DenyAlert textDeny={'Número de Agência já existe!'}></DenyAlert> : null} */}
        </Box>
      </Box>
    </>
  );
}