import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Title from '../Title';
import axios from 'axios';
import {
  validateBankName, validateBranchNumber, validateBranchName,
  validateIp, validatePort, validateNetworkMask,
  validateDnsAdress, validateGateway, validateIpFixoDhcp,
  validateMacAdress
} from '../../../utils/validate';

import { useForm } from 'react-hook-form';
import SuccessAlert from '../Alerts/SuccessAlert';
import DenyAlert from '../Alerts/DenyAlert';



export default function BranchFormReport(props) {

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
  const ipText = 'Ip já existe no sistema'
  const branchText = 'Agência cadastrada já existe no sistema'
  const onSubmit = async (data) => {

    const dataOptionsIp = props.options.filter(item => item.end_ip === data.end_ip)
    const dataOptionsBranch = props.options.filter(item => item.numero_ag === data.numero_ag)

    if (dataOptionsBranch.length === 0 && dataOptionsIp.length === 0) {

      await axios.post('http://localhost:4000', {

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
      <Title>Cadastro de Agência</Title>
      <Box
        mt={3}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, mb: 3, width: '23.3ch', height: '3ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box mb={3}>
          <TextField
            size="small"
            id="outlined"
            label="Nome do Banco"
            required
            type="text"
            {...register("nome_banco", {
              required: "Campo obrigatório",
              pattern: {
                value: validateBankName,
                message: "Nome Inválido"
              }
            })}
            error={!!errors?.nome_banco}
            helperText={errors?.nome_banco ? errors.nome_banco.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="Número da Agência"
            // autoComplete="Número da Agência"
            onChange={(e) => props.setBranchNumber(e.target.value)}
            required
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
          <TextField
            size="small"
            id="outlined"
            label="Nome Agência"
            // autoComplete="Nome Agência"            
            onChange={(e) => props.setBranchName(e.target.value)}
            required
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
          <TextField
            size="small"
            id="outlined"
            label='Endereço IP'
            // autoComplete='Endereço IP'            
            onChange={(e) => props.setIpAdress(e.target.value)}
            required
            type="text"
            {...register('end_ip', {
              required: "Campo obrigatório",
              pattern: {
                value: validateIp,
                message: "IP Inválido"
              }
            })}
            error={!!errors?.end_ip}
            helperText={errors?.end_ip ? errors.end_ip.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="Porta"
            // autoComplete='Porta'            
            onChange={(e) => props.setPort(e.target.value)}
            required
            type="text"
            {...register('porta', {
              required: "Campo obrigatório",
              pattern: {
                value: validatePort,
                message: "Porta Inválida"
              }
            })}
            error={!!errors?.porta}
            helperText={errors?.porta ? errors.porta.message : null}
          />
        </Box>
        <Box mb={3}>
          <TextField
            size="small"
            id="outlined"
            label="Máscara de Rede"
            // autoComplete='Máscara_Rede'
            onChange={(e) => props.setNetworkMask(e.target.value)}
            required
            type="text"
            {...register('masc_rede', {
              required: "Campo obrigatório",
              pattern: {
                value: validateNetworkMask,
                message: "Máscara de Rede Inválida"
              }
            })}
            error={!!errors?.masc_rede}
            helperText={errors?.masc_rede ? errors.masc_rede.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="Endereço DNS"
            // autoComplete='Endereço_DNS'
            onChange={(e) => props.setDnsAdress(e.target.value)}
            required
            type="text"
            {...register('end_dns', {
              required: "Campo obrigatório",
              pattern: {
                value: validateDnsAdress,
                message: "DNS Inválido"
              }
            })}
            error={!!errors?.end_dns}
            helperText={errors?.end_dns ? errors.end_dns.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="Gateway"
            onChange={(e) => props.setGateway(e.target.value)}
            required
            type="text"
            {...register('gateway', {
              required: "Campo obrigatório",
              pattern: {
                value: validateGateway,
                message: "Gateway Inválido"
              }
            })}
            error={!!errors?.gateway}
            helperText={errors?.gateway ? errors.gateway.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="IP Fixo / DHCP"
            // autoComplete='IP_Fixo_DHCP'            
            onChange={(e) => props.setIpFixoDhcp(e.target.value)}
            required
            type="text"
            {...register('ipfixo_dhcp', {
              required: "Campo obrigatório",
              pattern: {
                value: validateIpFixoDhcp,
                message: "Valor Inválido"
              }
            })}
            error={!!errors?.ipfixo_dhcp}
            helperText={errors?.ipfixo_dhcp ? errors.ipfixo_dhcp.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="MAC Adress"
            // autoComplete='Mac_Adress'
            onChange={(e) => props.setMacAdress(e.target.value)}
            required
            type="text"
            {...register('mac_adress', {
              required: "Campo obrigatório",
              pattern: {
                value: validateMacAdress,
                message: "Valor Inválido"
              }
            })}
            error={!!errors?.mac_adress}
            helperText={errors?.mac_adress ? errors.mac_adress.message : null}
          />
        </Box>
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button variant="contained" onClick={handleClick}>Limpar</Button>
          <Button variant="contained" type="submit">Criar Agência</Button>
        </Box>
        {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
        {denyAlert ? <DenyAlert textDeny={'Número de Agência e/ou IP já cadastrado(s)!'}></DenyAlert> : null}
      </Box>
    </Paper>
  );
}