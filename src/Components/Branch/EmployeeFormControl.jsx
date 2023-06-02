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

export default function EmployeeFormControl(props) {

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

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>Colaboradores</Title>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => { props.setEmployeeBtn(false), props.showReport() }}>
          Voltar
        </Button>
      </Box>
      <Box
        mt={6}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ mb: 2, gap: 1.5 }} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ mt: 1 }}>
            Colaborador 1
          </Typography>
          <TextField
            sx={{ mb: 3, width: '37ch', height: '3ch' }}
            size="small"
            id="outlined"
            label="Nome"
            onChange={(e) => props.setBranchName(e.target.value)}
            required
            type="text"
            {...register("nome", {
              required: "Campo obrigatório",
              pattern: {
                value: validateBranchName,
                message: "Nome inválido"
              }
            })}
            error={!!errors?.nome_ag}
            helperText={errors?.nome_ag ? errors.nome_ag.message : null}
          />
          <TextField
            sx={{ mb: 3, width: '16ch', height: '3ch' }}
            size="small"
            id="outlined"
            label='Matrícula'
            onChange={(e) => props.setIpAdress(e.target.value)}
            required
            type="text"
            {...register('end_ip', {
              required: "Campo obrigatório",
              pattern: {
                value: validateIp,
                message: "Matrícula Inválida"
              }
            })}
            error={!!errors?.end_ip}
            helperText={errors?.end_ip ? errors.end_ip.message : null}
          />
          <TextField
            sx={{ mb: 3, width: '16ch', height: '3ch' }}
            size="small"
            id="outlined-password-input"
            label="Senha"
            // autoComplete='Porta'            
            onChange={(e) => props.setPort(e.target.value)}
            required
            type="password"
            {...register('senha', {
              required: "Campo obrigatório",
              pattern: {
                value: validatePort,
                message: "Senha Inválida"
              }
            })}
            error={!!errors?.porta}
            helperText={errors?.porta ? errors.porta.message : null}
          />
          <Button sx={{ width: '12ch', height: '5ch' }} variant="contained" >Salvar</Button>
          <Button sx={{ width: '12ch', height: '5ch' }} variant="contained" >Editar</Button>
          <Button sx={{ width: '12ch', height: '5ch' }} variant="contained" >Excluir</Button>
        </Box>
        {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
        {denyAlert ? <DenyAlert textDeny={'Número de Agência já existe!'}></DenyAlert> : null}
      </Box>
    </Paper>
  );
}