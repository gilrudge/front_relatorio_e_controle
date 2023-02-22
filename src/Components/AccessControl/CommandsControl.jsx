import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import Title from '../Title';
import axios from 'axios';
import {
  validateBankName, validateBranchNumber, validateBranchName,
  validateIp, validatePort, validateNetworkMask,
  validateDnsAdress, validateGateway, validateIpFixoDhcp,
  validateMacAdress
} from '../../../utils/validate';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../Alerts/SuccessAlert';
import DenyAlert from '../Alerts/DenyAlert';

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));




export default function CommandsControl(props) {

  //ENABLE DOORS

  const [mainDoor, setMainDoor] = React.useState(false)

  const activateDoor = () => {
    mainDoor ? setMainDoor(true) : setMainDoor(false)
    console.log('funcionando')
  };
  
  
  //ALERTS
  const [successAlert, setSuccessAlert] = React.useState();
  const [denyAlert, setDenyAlert] = React.useState();

  const showSuccessAlert = () => successAlert ? setSuccessAlert(false) : setSuccessAlert(true);
  const showdenyAlert = () => denyAlert ? setDenyAlert(false) : setDenyAlert(true);


  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    defaultValues: {

      nome_banco: "",
      numero_ag: "",
      nome_ag: "",
      end_ip: "",
      porta: "",
      masc_rede: "",
      end_dns: "",
      gateway: "",
      ipfixo_dhcp: "",
      mac_adress: ""

    }
  });
  const handleClick = () => {
    resetField("nome_banco");
    resetField("numero_ag");
    resetField("nome_ag");
    resetField("end_ip");
    resetField("porta");
    resetField("masc_rede");
    resetField("end_dns");
    resetField("gateway");
    resetField("ipfixo_dhcp");
    resetField("mac_adress");
  }

  
  const enableMainDoor = async () => {
    
    if(mainDoor){
      await axios.get({
        method: 'get',
        url:'http://localhost:4002/enable-main-door'
      })
      console.log('Porta ativada')
    }else{
      console.log('porta desativada')
    }    
  }


  const onSubmit = async (data) => {
    const dataOptions = props.options.filter(item => item.numero_ag === data.numero_ag)

    if (dataOptions.length === 0) {

      await axios.post('http://localhost:4002', {

        nome_banco: data.nome_banco,
        numero_ag: data.numero_ag,
        nome_ag: data.nome_ag,
        end_ip: data.end_ip,
        porta: data.porta,
        masc_rede: data.masc_rede,
        end_dns: data.end_dns,
        gateway: data.gateway,
        ipfixo_dhcp: data.ipfixo_dhcp,
        mac_adress: data.mac_adress
      })
      props.updateOptions()
      handleClick()
      
    } else {
      setSuccessAlert(false)
      showdenyAlert()
      return
    }
    setDenyAlert(false)
    showSuccessAlert()
  }

  React.useEffect(()=> {
    enableMainDoor()
  },[mainDoor])

  return (
    <>
      <Box>
        <Title>Comandos</Title>
      </Box>
      <Box style={{display: 'flex', justifyContent: 'flex-end', margin: '0 20px 15px'}}>
        <Button sx={{ width: '30ch', height: '5ch'}} variant="contained" >TIRA AVISO COERÇÃO</Button>
      </Box>
      <Box
        m={1}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        style={{borderBottom: '1px solid #ddd', marginBottom: '20px', paddingBottom: '20px'}}
      >
        <Box sx={{mb: 2}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Box style={{display: 'flex'}}>
            <Typography sx={{mt: 1, mr: 1, width: '190px'}}>
              Porta Principal
            </Typography>
            <FormControlLabel
              control={
              <Android12Switch
                onChange={activateDoor}
                
              
              />}
              // label="Android 12"
            />
          </Box>
          <Box sx={{gap: 1.5}}>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Abertura"
                type="text"
                {...register("numero_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchNumber,
                    message: "Número agência inválido"
                  }
                })}
                error={!!errors?.numero_ag}
                helperText={errors?.numero_ag ? errors.numero_ag.message : null}
              />
            <Button sx={{ width: '8ch', height: '5ch', mr: 1.5}} variant="outlined">Ok</Button>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Fechamento"
                // autoComplete="Nome Agência"           
                type="text"
                {...register("nome_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchName,
                    message: "Nome agência inválido"
                  }
                })}
                error={!!errors?.nome_ag}
                helperText={errors?.nome_ag ? errors.nome_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined" >Ok</Button>
          </Box>
        </Box>

        <Box sx={{mb: 2}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Box style={{display: 'flex'}}>
            <Typography sx={{mt: 1, mr: 1, width: '190px'}}>
              Porta Acessibilidade
            </Typography>
            <FormControlLabel
              control={<Android12Switch defaultChecked />}
              // label="Android 12"
            />
          </Box>
          <Box sx={{gap: 1.5}}>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Abertura"
                type="text"
                {...register("numero_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchNumber,
                    message: "Número agência inválido"
                  }
                })}
                error={!!errors?.numero_ag}
                helperText={errors?.numero_ag ? errors.numero_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined">Ok</Button>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Fechamento"
                // autoComplete="Nome Agência"           
                type="text"
                {...register("nome_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchName,
                    message: "Nome agência inválido"
                  }
                })}
                error={!!errors?.nome_ag}
                helperText={errors?.nome_ag ? errors.nome_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined" >Ok</Button>
          </Box>
        </Box>
        <Box sx={{mb: 2}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Box style={{display: 'flex'}}>
            <Typography sx={{mt: 1, mr: 1, width: '190px'}}>
              Porta Caixas
            </Typography>
            <FormControlLabel
              control={<Android12Switch defaultChecked />}
              // label="Android 12"
            />
          </Box>
          <Box sx={{gap: 1.5}}>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Abertura"
                type="text"
                {...register("numero_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchNumber,
                    message: "Número agência inválido"
                  }
                })}
                error={!!errors?.numero_ag}
                helperText={errors?.numero_ag ? errors.numero_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined">Ok</Button>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Fechamento"
                // autoComplete="Nome Agência"           
                type="text"
                {...register("nome_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchName,
                    message: "Nome agência inválido"
                  }
                })}
                error={!!errors?.nome_ag}
                helperText={errors?.nome_ag ? errors.nome_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined" >Ok</Button>
          </Box>
        </Box>
        <Box sx={{mb: 2}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Box style={{display: 'flex'}}>
            <Typography sx={{mt: 1, mr: 1, width: '190px'}}>
              Porta Aço
            </Typography>
            <FormControlLabel
              control={<Android12Switch defaultChecked />}
              // label="Android 12"
            />
          </Box>
          <Box sx={{gap: 1.5}}>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Abertura"
                type="text"
                {...register("numero_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchNumber,
                    message: "Número agência inválido"
                  }
                })}
                error={!!errors?.numero_ag}
                helperText={errors?.numero_ag ? errors.numero_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined">Ok</Button>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Fechamento"
                // autoComplete="Nome Agência"           
                type="text"
                {...register("nome_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchName,
                    message: "Nome agência inválido"
                  }
                })}
                error={!!errors?.nome_ag}
                helperText={errors?.nome_ag ? errors.nome_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined" >Ok</Button>
          </Box>
        </Box>
        <Box sx={{mb: 2}} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Box style={{display: 'flex'}}>
            <Typography sx={{mt: 1, mr: 1, width: '190px'}}>
              Reconhecimento Facial
            </Typography>
            <FormControlLabel
              control={<Android12Switch defaultChecked />}
              // label="Android 12"
            />
          </Box>
          <Box sx={{gap: 1.5}}>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Abertura"
                type="text"
                {...register("numero_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchNumber,
                    message: "Número agência inválido"
                  }
                })}
                error={!!errors?.numero_ag}
                helperText={errors?.numero_ag ? errors.numero_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined">Ok</Button>
            <TextField
                sx={{ width: '14ch', mr: 1.5}}
                size="small"
                id="outlined"
                label="Fechamento"
                // autoComplete="Nome Agência"           
                type="text"
                {...register("nome_ag", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: validateBranchName,
                    message: "Nome agência inválido"
                  }
                })}
                error={!!errors?.nome_ag}
                helperText={errors?.nome_ag ? errors.nome_ag.message : null}
              />
            <Button sx={{ width: '5ch', height: '5ch', mr: 1.5}} variant="outlined" >Ok</Button>
          </Box>
        </Box>

        {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
        {denyAlert ? <DenyAlert textDeny={'Número de Agência já existe!'}></DenyAlert> : null}
      </Box>
    </>
  );
}