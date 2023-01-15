import * as React from 'react';
import Title from '../Title';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';


export default function UpdateBranch(props) {

  // async function deleteBranch(_branchNumber){
    //   await axios.delete(`http://localhost:4000/${_branchNumber}`)
    //   // updateOptions()
    //   window.location.reload()
    //   alert('Agência excluída com sucesso')
    // }
    
    async function alterBranch(_branchNumber){
      await axios.put(`http://localhost:4000/${_branchNumber}`,
      {
        nome_banco: props.bankName,
        nome_ag: props.branchName,
        end_ip: props.ipAdress,
        porta: props.port,
        masc_rede: props.networkMask,
        end_dns: props.dnsAdress,
        gateway: props.gateway,
        ipfixo_dhcp: props.ipFixoDhcp,
        mac_adress: props.macAdress
      })
      window.location.reload()

      // props.setBranchName(props.data.branch.nome_ag)
      // props.setIpAdress(props.data.branch.end_ip)
      // props.setPort(props.data.branch.porta)
      // props.setNetworkMask(props.data.branch.masc_rede)
      // props.setDnsAdress(props.data.branch.end_dns)
      // props.setGateway(props.data.branch.gateway)
      // props.setIpFixoDhcp(props.data.branch.ipfixo_dhcp)
      // props.setMacAdress(props.data.branch.mac_adress)

      alert('Agência alterada com sucesso')
      props.showReport()
      
    }

    useEffect(()=> {
      props.updateOptions()
      
    }, [])

  return (
    <>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Alterar Dados</Title>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 , mb: 3, width: '23.3ch', height: '3ch'},
        }}
        noValidate
        autoComplete="off"      
      >
        <Box>
        <TextField
              size="small"
              id="outlined"
              label="Nome do Banco"
              value={props.data.branch.nome_banco}
              disabled
            />
        
          <TextField
            size="small"
            id="outlined"
            label="Número da Agência"
            value={props.data.branch.numero_ag}
            disabled            
          />
          <TextField
            size="small"
            id="outlined"
            label="Nome da Agência"            
            defaultValue={props.data.branch.nome_ag}
            onChange={(e) => props.setBranchName(e.target.value)}            
          />
          <TextField
            size="small"
            id="outlined"
            label="Endereço de IP"
            
            defaultValue={props.data.branch.end_ip}
            onChange={(e) => props.setIpAdress(e.target.value)}              
          />
          <TextField
            size="small"
            id="outlined"
            label="Porta"
            
            defaultValue={props.data.branch.porta}
            onChange={(e) => props.setPort(e.target.value)}           
          />
        </Box>
        <Box>
          <TextField
            size="small"
            id="outlined"
            label="Máscara de Rede"
            
            defaultValue={props.data.branch.masc_rede}
            onChange={(e) => props.setNetworkMask(e.target.value)}            
          />
          <TextField
            size="small"
            id="outlined"
            label="Endereço DNS"
            
            defaultValue={props.data.branch.end_dns}
            onChange={(e) => props.setDnsAdress(e.target.value)}            
          />
          <TextField
            size="small"
            id="outlined"
            label="Gateway"
            
            defaultValue={props.data.branch.gateway}
            onChange={(e) => props.setGateway(e.target.value)}             
          />
          <TextField
            size="small"
            id="outlined"
            label="IP Fixo / DHCP"         
            defaultValue={props.data.branch.ipfixo_dhcp}
            onChange={(e) => props.setIpFixoDhcp(e.target.value)}          
          />
          
          <TextField
              size="small"
              id="outlined"
              label="MAC Adress"
              value={props.data.branch.mac_adress}
              onChange={(e) => props.setMacAdress(e.target.value)}
          />
        </Box>

        <Box sx={{m: 2, display: 'flex', justifyContent:'end', gap: 2}}>
          <Button variant="contained" onClick={()=>{alterBranch(props.data.branch.numero_ag), props.showReport(), props.showChanges()}}>Salvar Alterações</Button>
          {/* <Button variant="contained" onClick={()=>{deleteBranch(props.data.branch.numero_ag)}}>Excluir Agência</Button> */}
        </Box> 

      </Box>
      
      
      </Paper>
    </>
  );
}