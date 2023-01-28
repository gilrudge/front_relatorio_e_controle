import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UpdateBranch from '../Branch/UpdateBranch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import BranchForm from '../Branch/BranchForm';
import axios from 'axios';
import { useEffect } from 'react';
import BranchInfo from './BranchInfo';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

export default function AccessReport() {

  const {register, handleSubmit, resetField, formState:{errors}} = useForm({})

  const [branchNumber, setBranchNumber] = React.useState();
  const [networkMask, setNetworkMask] = React.useState();
  const [ipFixoDhcp, setIpFixoDhcp] = React.useState();
  const [branchName, setBranchName] = React.useState();
  const [dnsAdress, setDnsAdress] = React.useState();
  const [macAdress, setMacAdress] = React.useState();
  const [bankName, setBankName] = React.useState();
  const [ipAdress, setIpAdress] = React.useState();
  const [gateway, setGateway] = React.useState();
  const [port, setPort] = React.useState();

  const [selectedBranch, setSelectedBranch] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();
  const [options, setOptions] = React.useState([]);
  const [changes, setChanges] = React.useState();
  const [report, setReport] = React.useState();
  const [events, setEvents] = React.useState([]);
 
  const [form, setForm] = React.useState();

  const showChanges = () => changes ? setChanges(false) : setChanges(true)
  const showReport = () => report ? setReport(false) : setReport(true);
  const showForm = () => form ? setForm(false) : setForm(true);
  // const handleSubmit = (e) => e.preventDefault();

  // const {numero_ag} = selectedBranch

  const getInfosBranch = async (branchNumber, chosenDate) => {
    await axios.get(`http://localhost:4000/${branchNumber}/?date=${chosenDate}`)
        .then((response) => {setEvents(response.data.relatorio)})
      }

  const fetchOptions = async () => {
    const dbList = await axios.get(`http://localhost:4000`)
    setOptions(dbList.data)
  }
  console.log({selectedBranch, selectedDate, options})

  useEffect(() => {
    
    fetchOptions()
  }, [options])

  useEffect(() => {


    
  }, [events])
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent={'space-between'} >
              <Stack direction="row" sx={{ alignItems: 'center' }} >
                <Box 
                  component="form"
                  onSubmit={(event) => { event.preventDefault(), handleSubmit(event, getInfosBranch(selectedBranch.numero_ag, selectedDate))}}
                  sx={{display: 'flex'}}

                  >
                  <Autocomplete
                    onChange={(_event, value) => setSelectedBranch(value)}
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={options}
                    getOptionLabel={(option) => `${option.numero_ag} | ${option.nome_ag}`}                    
                    isOptionEqualToValue={(option) => `${option.numero_ag} | ${option.nome_ag}`}
                    sx={{ m: 1, width: 300 }}
                    renderInput={(params) => <TextField {...params} required label="Agência" />}
                    value={selectedBranch}
                                    
                  />                
                <TextField sx={{ m: 1 , width: 200 }}
                  required
                  type="date"
                  size="small"
                  id='data-field'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                {selectedBranch
                  && selectedDate
                  ?
                  <IconButton
                    color="primary"
                    size="large"
                    type="submit" 
                    onSubmit={(event) => {handleSubmit(event, getInfosBranch(selectedBranch.numero_ag, selectedDate))}}
                    onClick={() => {showReport(true), setForm(false)}}>
                    <SearchIcon fontSize="inherit" />
                  </IconButton>
                  : null}

                  </Box>
              </Stack>
              <Stack>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { showForm(), setReport(false) }}>
                  Cadastrar Agência
                </Button>
              </Stack>
            </Stack>
          </Paper>
          {form ?
          <BranchForm 
              updateOptions={fetchOptions}
              data={{ branch: selectedBranch, date: selectedDate }}
              setBranchNumber={setBranchNumber}
              setNetworkMask={setNetworkMask}
              setIpFixoDhcp={setIpFixoDhcp}
              setBranchName={setBranchName}
              setDnsAdress={setDnsAdress}
              setMacAdress={setMacAdress}
              setBankName={setBankName}
              setIpAdress={setIpAdress}
              setGateway={setGateway}
              setPort={setPort}
              branchNumber={branchNumber}
              networkMask={networkMask}
              ipFixoDhcp={ipFixoDhcp}
              branchName={branchName}
              dnsAdress={dnsAdress}
              macAdress={macAdress}
              bankName={bankName}
              ipAdress={ipAdress}
              gateway={gateway}
              port={port}
              options={options}

              events={events}
              setEvents={setEvents}
              getInfosBranch={getInfosBranch}
          
          /> : null}
        </Grid>
        <Grid item xs={12}>

          {changes && selectedBranch ?
            <UpdateBranch
              showReport={showReport}
              showChanges={showChanges}
              updateOptions={fetchOptions}
              data={{ branch: selectedBranch, date: selectedDate }}
              setBranchNumber={setBranchNumber}
              setNetworkMask={setNetworkMask}
              setIpFixoDhcp={setIpFixoDhcp}
              setBranchName={setBranchName}
              setDnsAdress={setDnsAdress}
              setMacAdress={setMacAdress}
              setBankName={setBankName}
              setIpAdress={setIpAdress}
              setGateway={setGateway}
              setPort={setPort}
              branchNumber={branchNumber}
              networkMask={networkMask}
              ipFixoDhcp={ipFixoDhcp}
              branchName={branchName}
              dnsAdress={dnsAdress}
              macAdress={macAdress}
              bankName={bankName}
              ipAdress={ipAdress}
              gateway={gateway}
              port={port}
              setChanges={setChanges}

              events={events}
              setEvents={setEvents}
              getInfosBranch={getInfosBranch}
            />
            : null}

          {report && selectedBranch ?
            <BranchInfo
            showReport={showReport}
            showChanges={showChanges}
            updateOptions={fetchOptions}
            data={{ branch: selectedBranch, date: selectedDate }}
            setBranchNumber={setBranchNumber}
            setNetworkMask={setNetworkMask}
            setIpFixoDhcp={setIpFixoDhcp}
            setBranchName={setBranchName}
            setDnsAdress={setDnsAdress}
            setMacAdress={setMacAdress}
            setBankName={setBankName}
            setIpAdress={setIpAdress}
            setGateway={setGateway}
            setPort={setPort}
            report={report}
            port={port}

            events={events}
            setEvents={setEvents}
             getInfosBranch={getInfosBranch}
            /> : null}
        </Grid>
      </Grid>
    </>
  )
};

