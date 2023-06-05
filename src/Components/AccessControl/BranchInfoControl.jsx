import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Title from '../Title';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { CSVLink } from "react-csv";
import StatusIcon from '../Avatar/StatusIcon';
import CommandsControl from './CommandsControl';
import { ipControl } from '../../../utils/variables';

export default function BranchInfoControl(props) {

  const [infosAndStatus, setInfosAndStatus] = React.useState([]);
  // const [downloadCsv, setDownloadCsv] = React.useState([]);
  const [statusPorts, setStatusPorts] = React.useState({});
  const [statusBranch, setStatusBranch] = React.useState(false);


  const getInfosAndStatus = async (branchNumber) => {
    await axios.get(`http://${ipControl}/${branchNumber}/`)
      .then((response) => { setInfosAndStatus(response.data.status) })
  }

  const automaticUpdate = async () => {
    await getInfosAndStatus(props.data.branch.numero_ag)
  };

  const getStatusBranch = async (ip) => {
    await axios.get(`http://${ipControl}/status-branch/${ip}`)
      .then(response => {
        response.data ? setStatusBranch(true) : setStatusBranch(false)
      })
      .catch(e => automaticUpdate())
  }

  useEffect(() => {
    if (props.report || props.employeeBtn) {
      automaticUpdate()
      getStatusBranch(props.data.branch.end_ip)
    }
  }, [infosAndStatus])

  const columnsReport = [
    { field: 'data_evt', headerName: 'DATA', width: 100 },
    { field: 'hora_evt', headerName: 'HORA', width: 100 },
    { field: 'usuario', headerName: 'USUÁRIO', width: 150 },
    { field: 'comando', headerName: 'COMANDO', width: 400 },
    { field: 'valor', headerName: 'VALOR', width: 80 },
    { field: 'mac_adress', headerName: 'MAC', width: 180 },
  ];


  const rowsReport = props.events.map(evento => {
    const id = uuid()
    return {
      id: id,
      data_evt: evento.data_evt,
      hora_evt: evento.hora_evt,
      usuario: evento.usuario,
      comando: evento.comando,
      valor: evento.valor,
      mac_adress: evento.mac_adress
    }
  });

  const csvData = props.events.map(evento => {
    const id = uuid()
    return {
      id: id,
      nome_ag: props.data.branch.nome_ag,
      numero_ag: props.data.branch.numero_ag,
      data_evt: evento.data_evt,
      hora_evt: evento.hora_evt,
      usuario: evento.usuario,
      valor: evento.valor,
      comando: evento.comando,
      mac_adress: props.data.branch.mac_adress,
    }
  });

  return (
    <>
      <Paper sx={{ p: 2, height: '1700px', display: 'flex', flexDirection: 'column' }}>
        <Title>Dados da Agência</Title>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, mb: 3, width: '23.3ch', height: '3ch' },
          }}
          noValidate
          autoComplete="off"
          style={{ borderBottom: '1px solid #ddd', marginBottom: '20px', paddingBottom: '20px' }}
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
              value={props.data.branch.nome_ag}
              onChange={(e) => props.setBranchName(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="Endereço de IP"
              value={props.data.branch.end_ip}
              onChange={(e) => props.setIpAdress(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="Porta"
              value={props.data.branch.porta}
              onChange={(e) => props.setPort(e.target.value)}
              disabled
            />
          </Box>
          <Box>
            <TextField
              size="small"
              id="outlined"
              label="Máscara de Rede"
              value={props.data.branch.masc_rede}
              onChange={(e) => props.setNetworkMask(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="Endereço DNS"
              value={props.data.branch.end_dns}
              onChange={(e) => props.setDnsAdress(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="Gateway"
              value={props.data.branch.gateway}
              onChange={(e) => props.setGateway(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="IP Fixo / DHCP"
              value={props.data.branch.ipfixo_dhcp}
              onChange={(e) => props.setIpFixoDhcp(e.target.value)}
              disabled
            />
            <TextField
              size="small"
              id="outlined"
              label="MAC Adress"
              value={props.data.branch.mac_adress}
              onChange={(e) => props.setMacAdress(e.target.value)}
              disabled
            />
          </Box>

          <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Box>
              {statusBranch ? <StatusIcon color='green' /> : <StatusIcon color='red' />}
            </Box>

            <Box>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                onClick={() => { props.setEmployeeBtn(true), props.showReport() }}
              >
                Colaboradores
              </Button>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                onClick={() => { props.showChanges(), props.showReport() }}
              >
                Editar Agência
              </Button>
              <Button variant="contained">
                <CSVLink
                  data={csvData}
                  filename={"relatorio-eventos-agencia.csv"}
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#FFF' }}
                >Exportar Dados
                </CSVLink>
              </Button>
            </Box>
          </Box>
        </Box>
        {infosAndStatus.length !== 0 ?
          <CommandsControl
            getInfosAndStatus={getInfosAndStatus}
            // getStatusPorts={getStatusPorts}
            statusPorts={statusPorts}
            infosAndStatus={infosAndStatus}
            data={props.data.branch}
          /> : null}
        <Box sx={{ height: 450, width: '100%' }}>
          <Box
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}
          >
            <Title>Controle de Acesso</Title>
            <Button
              variant="contained"
              onClick={() => { props.getEvents(props.data.branch.numero_ag) }}
            >
              Atualizar
            </Button>
          </Box>
          <DataGrid
            id="controle_acesso"
            getRowId={(evento) => evento?.id}
            rowHeight={30}
            rows={rowsReport}
            columns={columnsReport}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Box>

      </Paper>

    </>
  );

}