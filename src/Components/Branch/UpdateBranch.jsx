import * as React from 'react';
import Title from '../Title';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  validateBankName, validateBranchNumber, validateBranchName,
  validateIp, validatePort,  validateNetworkMask,
  validateDnsAdress, validateGateway, validateIpFixoDhcp,
  validateMacAdress
        } from '../../../utils/validate';
import SuccessAlert from '../Alerts/SuccessAlert';


export default function UpdateBranch(props) {

    const [updateAlert,setUpdateAlert] = React.useState(false);
    const showUpdateAlert = () => updateAlert ? setUpdateAlert(false) : setUpdateAlert(true);

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

    const {register, handleSubmit, resetField, formState:{errors}} = useForm({defaultValues:{
      
      nome_banco:props.data.branch.nome_banco,
      numero_ag: props.data.branch.numero_ag,
      nome_ag: props.data.branch.nome_ag,
      end_ip:props.data.branch.end_ip,
      porta: props.data.branch.porta,
      masc_rede: props.data.branch.masc_rede,
      end_dns: props.data.branch.end_dns,
      gateway: props.data.branch.gateway,
      ipfixo_dhcp: props.data.branch.ipfixo_dhcp,
      mac_adress: props.data.branch.mac_adress

    }});
    
    const onSubmit = async (data) =>{      
      
      await axios.put(`http://localhost:4000/${data.numero_ag}`,
      {
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
    
      showUpdateAlert()      
      window.location.reload()
    }
    
    useEffect(()=> {
           
    }, [props.data.branch])

  return (
    <>
    
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Alterar Dados</Title>
      <Box
        mt={3}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 , mb: 3, width: '23.3ch', height: '3ch'},
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
              disabled
              type="text"            
            {...register("nome_banco", {
              required:"Campo obrigatório",
              pattern:{
                value: validateBankName,
                message: "Nome Inválido"}
              })}
            error={!!errors?.nome_banco}
            helperText={errors?.nome_banco ? errors.nome_banco.message : null}
            />        
          <TextField
            size="small"
            id="outlined"
            label="Número da Agência"            
            disabled
            type="text"            
            {...register("numero_ag", {
              required:"Campo obrigatório",
              pattern:{
                value: validateBranchNumber,
                message: "Número agência inválido"}
              })}
            error={!!errors?.numero_ag}
            helperText={errors?.numero_ag ? errors.numero_ag.message : null}            
          />
          <TextField
            size="small"            
            id="outlined"
            label="Nome Agência"
            // autoComplete="Nome Agência"           
            required
            type="text"            
            {...register("nome_ag", {
              required:"Campo obrigatório",
              pattern:{
                value: validateBranchName,
                message: "Nome agência inválido"}
              })}
            error={!!errors?.nome_ag}
            helperText={errors?.nome_ag ? errors.nome_ag.message : null}
          />          
          <TextField
            size="small"
            id="outlined"
            label='Endereço IP'
            // autoComplete='Endereço IP'            
            required
            type="text"            
            {...register('end_ip', {
              required:"Campo obrigatório",
              pattern:{
                value: validateIp,
                message: "IP Inválido"}
              })}
            error={!!errors?.end_ip}
            helperText={errors?.end_ip ? errors.end_ip.message : null}
            />
            <TextField
            size="small"            
            id="outlined"
            label="Porta"
            // autoComplete='Porta'            
            required
            type="text"            
            {...register('porta', {
              required:"Campo obrigatório",
              pattern:{
                value: validatePort,
                message: "Porta Inválida"}
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
            required
            type="text"
            {...register('masc_rede', {
              required:"Campo obrigatório",
              pattern:{
                value: validateNetworkMask,
                message: "Máscara de Rede Inválida"}
              })}
            error={!!errors?.masc_rede}
            helperText={errors?.masc_rede ? errors.masc_rede.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="Endereço DNS"
            // autoComplete='Endereço DNS'          
            required
            type="text"
            {...register('end_dns', {
              required:"Campo obrigatório",
              pattern:{
                value: validateDnsAdress,
                message: "DNS Inválido"}
              })}
            error={!!errors?.end_dns}
            helperText={errors?.end_dns ? errors.end_dns.message : null}
          />          
          <TextField
            size="small"
            id="outlined"
            label="Gateway"            
            required
            type="text"
            {...register('gateway', {
              required:"Campo obrigatório",
              pattern:{
                value: validateGateway,
                message: "Gateway Inválido"}
              })}
            error={!!errors?.gateway}
            helperText={errors?.gateway ? errors.gateway.message : null}
          />          
          <TextField
            size="small"
            id="outlined"
            label="IP Fixo / DHCP"            
            // autoComplete="IP Fixo / DHCP"            
            
            required
            type="text"
            {...register("ipfixo_dhcp", {
              required:"Campo obrigatório",
              pattern:{
                value: validateIpFixoDhcp,
                message: "Valor Inválido"}
              })}
            error={!!errors?.ipfixo_dhcp}
            helperText={errors?.ipfixo_dhcp ? errors.ipfixo_dhcp.message : null}
          />
          <TextField
            size="small"
            id="outlined"
            label="MAC Adress"            
            // autoComplete="MAC Adress"            
            required
            type="text"
            {...register('mac_adress', {
              required:"Campo obrigatório",
              pattern:{
                value: validateMacAdress,
                message: "Valor Inválido"}
              })}
            error={!!errors?.mac_adress}
            helperText={errors?.mac_adress ? errors.mac_adress.message : null}
          />          
        </Box>
        <Box sx={{m: 2, display: 'flex', justifyContent:'end', gap: 2}}>         
          <Button variant="contained" type="submit">Salvar Alterações</Button>          
        </Box>
        {updateAlert ? <SuccessAlert textSuccess={'Agência alterada com Sucesso!'}></SuccessAlert> : null}
      </Box>      
    </Paper>
    </>
  );
}