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
import { borderBottom } from '@mui/system';


export default function BranchInfoControl(props) {

  const [events, setEvents] = React.useState([]);
  const [statusPort, setStatusPort] = React.useState([]);
  const [downloadCsv, setDownloadCsv] = React.useState([]);


  // const automaticUpdate = async () => {
  //   if (props.report) {
  //     setInterval(await getInfosBranch(props.data.branch.numero_ag, 20000))
  //   }
  // }

  // const getInfosBranch = async (branchNumber) => {
    
  //   await axios.get(`http://localhost:4002/${branchNumber}/`)
  //     .then((response) => { setEvents(response.data.relatorio) })

  // }
  // useEffect(() => {

  //   automaticUpdate()
  //   getStatusPort()

  // }, [events]);


  // const getStatusPort = async () => {

  //   await axios.get(`http://localhost:4000/status`)
  //     .then((response) => {
  //       setStatusPort(response.data)
  //       if (response.data.name) {
  //         getStatusPort();
  //       }
  //       else automaticUpdate()
  //     })
         
  // }

  // useEffect(() => {
  //   const getCsvInfo = async (branchNumber, chosenDate) => {
      
  //     await axios.get(`http://localhost:4000/export/${branchNumber}/?date=${chosenDate}`)
  //       .then((response) => { setDownloadCsv([response.data]) })
  //   }
  //   getCsvInfo(props.data.branch.numero_ag, (props.data.date).split("-").reverse().join("/"))


  // }, [downloadCsv])

  const columnsReport = [
    { field: 'date', headerName: 'DATA', width: 100 },
    { field: 'hour', headerName: 'HORA', width: 100 },
    { field: 'employee', headerName: 'COLABORADOR', width: 350 },
    { field: 'register', headerName: 'MATRÍCULA', width: 130 },
    { field: 'descEvent', headerName: 'EVENTO', width: 300 },
    { field: 'door', headerName: 'PORTA', width: 130 }    
  ];


  const rowsReport = events.map(evento => {
    const id = uuid()
    return {
      id: id,
      date: evento.data_evt,
      hour: evento.hora_evt,
      employee: evento.nome,
      register: evento.nr_matricula,
      descEvent: evento.descricao.desc_evento,
      door: evento.porta_evt
    }
  });

  const csvData = events.map(evento => {
    const id = uuid()
    return {
      id: id,
      nome_ag: props.data.branch.nome_ag,
      numero_ag: props.data.branch.numero_ag,
      descEvent: evento.descricao.desc_evento,
      date: evento.data_evt,
      hour: evento.hora_evt,
      cont: evento.cont_evt,
      end_ip: props.data.branch.end_ip,
      porta: props.data.branch.porta,
      masc_rede: props.data.branch.masc_rede,
      gateway: props.data.branch.gateway,
      mac_adress: props.data.branch.mac_adress,
      ipfixo_dhcp: props.data.branch.ipfixo_dhcp,
      sequence: evento.nr_seq,
      crc: evento.crc,
    }
  });

  return (
    <>
      <Paper sx={{ p: 2, height: '1250px', display: 'flex', flexDirection: 'column' }}>
        <Title>Dados da Agência</Title>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, mb: 3, width: '23.3ch', height: '3ch' },
          }}
          noValidate
          autoComplete="off"
          style={{borderBottom: '1px solid #ddd', marginBottom: '20px', paddingBottom: '20px'}}
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
              {statusPort == props.data.branch.mac_adress ? <StatusIcon color='green' /> : <StatusIcon color='red' />}
            </Box>

            <Box>
            <Button
                sx={{ mr: 2 }}
                variant="contained"
                onClick={() => { props.setEmployeeBtn(true), props.showReport()}}
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
                  filename={"my-file.csv"}
                  target="_blank"
                  style={{ textDecoration: 'none', color: '#FFF' }}
                >Exportar Dados
                </CSVLink>
              </Button>
            </Box>
          </Box>
        </Box>
        <CommandsControl/>
        <Box sx={{ height: 450, width: '100%' }}>
          <Title>Controle de Acesso</Title>
          <DataGrid
            id="relatorio_acesso"
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