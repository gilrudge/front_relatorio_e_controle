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

export default function BranchInfo(props) {

  // const [events, setEvents] = React.useState([]);
  const [downloadCsv, setDownloadCsv] = React.useState([]);
  const [statusPort, setStatusPort] = React.useState(0);
  const [alterColor, setAlterColor] = React.useState('red');



  // const getInfosBranch = async (branchNumber, chosenDate) => {
  //   await axios.get(`http://localhost:4000/${branchNumber}/?date=${chosenDate}`)
  //       .then((response) => {setEvents(response.data.relatorio)})
  //     }


  // const numAgEvent = events.reduce((acc,item, index, array) => {
  //   return item.nr_agencia},0)
    // console.log(teste)
      
  const automaticUpdate = async () => {
    
    if(props.report) {        
      await props.getInfosBranch(props.data.branch.numero_ag, (props.data.date).split("-").reverse().join("/"))        
    }
  }

  // console.log(numAgEvent)
  // console.log(typeof(numAgEvent))
  // console.log(props.data.branch.numero_ag)
  // console.log(typeof(props.data.branch.numero_ag))

  const deviceStatus = async () => {
    await axios.get(`http://localhost:4000/status`)              
               .then(response => {setStatusPort(response.data.r)})
  };
  
  const changeStatusColor = async () => {
    // statusPort && statusPort == 1 ? setAlterColor('green') : setAlterColor('red') ? statusPort == null : automaticUpdate()    

    statusPort === 1 ? setAlterColor('green') : setAlterColor('red')   
    // if(statusPort && statusPort === 1 && props.data.branch.numero_ag === numAgEvent)
  }

  useEffect(()=>{ 
    automaticUpdate()    
    deviceStatus() 
    changeStatusColor()
    },[props.events]);
    
    
    useEffect (() => {
      const getCsvInfo = async (branchNumber, chosenDate) => {
        await axios.get(`http://localhost:4000/export/${branchNumber}/?date=${chosenDate}`)
            .then((response) => {setDownloadCsv([response.data])})            
      }
      getCsvInfo(props.data.branch.numero_ag, (props.data.date).split("-").reverse().join("/"))
      

    },[downloadCsv])

    const columnsReport = [
      { field: 'date', headerName: 'DATA', width: 130 },
      { field: 'hour', headerName: 'HORA', width: 130 },
      { field: 'sequence', headerName: 'SEQUÊNCIA', width: 130 },
      { field: 'descEvent', headerName: 'EVENTO', width: 380 },
      { field: 'cont', headerName: 'CONTADOR', width: 130 },
      { field: 'crc', headerName: 'CRC', width: 200 }
    ];    

    const rowsReport = props.events.map(evento=> {
        const id = uuid()
        return {
          id:id,
          date: evento.data_evt,
          hour:evento.hora_evt,
          descEvent: evento.descricao.desc_evento,
          sequence:evento.nr_seq,
          cont: evento.cont_evt,
          crc:evento.crc
        }
      });
    // const rowsReport = events[1].map(evento=> {
    //   const id = uuid()
    //   return {
    //     id:id,
    //     date: evento.data_evt,
    //     hour:evento.hora_evt,
    //     descEvent: evento.descricao.desc_evento,
    //     sequence:evento.nr_seq,
    //     cont: evento.cont_evt,
    //     crc:evento.crc
    //   }
    // });

    const csvData = props.events.map(evento=> {
      const id = uuid()
      return {
        id:id,
        nome_ag: props.data.branch.nome_ag,
        numero_ag: props.data.branch.numero_ag,
        descEvent: evento.descricao.desc_evento,
        date: evento.data_evt,
        hour:evento.hora_evt,
        cont: evento.cont_evt,
        end_ip: props.data.branch.end_ip,
        porta: props.data.branch.porta,
        masc_rede: props.data.branch.masc_rede,
        gateway: props.data.branch.gateway,
        mac_adress: props.data.branch.mac_adress,
        ipfixo_dhcp: props.data.branch.ipfixo_dhcp,
        sequence:evento.nr_seq,
        crc:evento.crc,
      }
    });

          
  return (
    <>
      <Paper sx={{ p: 2, height:'780px', display: 'flex', flexDirection: 'column' }}>
        <Title>Dados da Agência</Title>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, mb: 3, width: '23.3ch', height: '3ch' },
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
          
          
          <Box sx={{ m: 2, display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>

            <Box>
              {/* {statusPort && statusPort == 1 ? <StatusIcon color='green'/> : <StatusIcon color='red'/>}*/}
              <StatusIcon color={alterColor}/>
            </Box>

            <Box>
              <Button
              sx={{mr: 2}}
                variant="contained"
                onClick={ () => { props.showChanges(), props.showReport() }}
                >
                Editar Agência
              </Button>            
              <Button variant="contained">
                <CSVLink
                data={csvData}
                filename={"my-file.csv"}
                target="_blank"
                style={{ textDecoration: 'none', color: '#FFF'}}             
                >Exportar Dados
                </CSVLink>
              </Button>          
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 450, width: '100%' }}>
          <Title>Relatório de Acesso</Title>
            <DataGrid
            id="relatorio_acesso"
            getRowId={(evento)=> evento?.id}
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