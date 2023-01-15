import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Title from '../Title';
import axios from 'axios';


export default function BranchForm(props) {

  // const [branchNumber, setBranchNumber] = React.useState();
  // const [networkMask, setNetworkMask] = React.useState();
  // const [ipFixoDhcp, setIpFixoDhcp] = React.useState();
  // const [branchName, setBranchName] = React.useState();
  // const [dnsAdress, setDnsAdress] = React.useState();
  // const [ipAdress, setIpAdress] = React.useState();
  // const [gateway, setGateway] = React.useState();
  // const [port, setPort] = React.useState();
  // const [bankName, setBankName] = React.useState();

  function refreshBranchForm() {
    
    props.setBranchNumber('');
    props.setNetworkMask('');
    props.setIpFixoDhcp('');
    props.setBranchName('');
    props.setDnsAdress('');
    props.setMacAdress('');
    props.setIpAdress('');
    props.setBankName('');
    props.setGateway('');
    props.setPort('');
        
  }


  const createBranch = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000', {
      nome_banco: props.bankName,
      numero_ag: props.branchNumber,
      nome_ag: props.branchName,
      end_ip: props.ipAdress,
      porta: props.port,
      masc_rede: props.networkMask,
      end_dns: props.dnsAdress,
      gateway: props.gateway,
      ipfixo_dhcp: props.ipFixoDhcp,
      mac_adress: props.macAdress
    })
    props.updateOptions()
    refreshBranchForm()
    alert('Agência criada com sucesso')
  }

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Title>Cadastro de Agência</Title>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, mb: 3, width: '23.3ch', height: '3ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={createBranch}
      >
        <Box>
        <TextField
            size="small"
            // error
            id="outlined"
            label="Nome do Banco"
            value={props.bankName || ''}
            onChange={(e) => props.setBankName(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Nome da Agência"
            value={props.branchName || ''}
            onChange={(e) => props.setBranchName(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Número da Agência"
            value={props.branchNumber || ''}
            onChange={(e) => props.setBranchNumber(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Endereço de IP"
            value={props.ipAdress || ''}
            onChange={(e) => props.setIpAdress(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Porta"
            value={props.port || ''}
            onChange={(e) => props.setPort(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Máscara de Rede"
            value={props.networkMask || ''}
            onChange={(e) => props.setNetworkMask(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Endereço DNS"
            value={props.dnsAdress || ''}
            onChange={(e) => props.setDnsAdress(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Gateway"
            value={props.gateway || ''}
            onChange={(e) => props.setGateway(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="IP Fixo / DHCP"
            value={props.ipFixoDhcp || ''}
            onChange={(e) => props.setIpFixoDhcp(e.target.value)}
            required
          />
          <TextField
            size="small"
            // error
            id="outlined"
            label="Mac Adress"
            value={props.macAdress || ''}
            onChange={(e) => props.setMacAdress(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button variant="contained" onClick={ refreshBranchForm }>Limpar</Button>
          <Button variant="contained" type="submit">Criar Agência</Button>
        </Box>
      </Box>
    </Paper>
  );
}