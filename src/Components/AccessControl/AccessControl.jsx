import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import * as React from 'react';
import axios from 'axios';

import UpdateBranchControl from './UpdateBranchControl';
import EmployeeFormControl from './EmployeeFormControl';
import Autocomplete from '@mui/material/Autocomplete';
import BranchInfoControl from './BranchInfoControl';
import BranchFormControl from './BranchFormControl';
import { ipControl } from '../../../utils/variables';


export default function AccessControl() {

  const { register, handleSubmit, resetField, formState: { errors } } = useForm({})

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
  const [infosAndStatus, setInfosAndStatus] = React.useState([]);
  // const [selectedDate, setSelectedDate] = React.useState();
  const [options, setOptions] = React.useState([]);
  const [changes, setChanges] = React.useState();
  const [report, setReport] = React.useState();
  const [loading, setLoading] = React.useState(false)
  const [employeeBtn, setEmployeeBtn] = React.useState(false)
  const [events, setEvents] = React.useState([]);

  const [form, setForm] = React.useState();

  const showChanges = () => changes ? setChanges(false) : setChanges(true)
  const showReport = () => report ? setReport(false) : setReport(true);
  const showForm = () => form ? setForm(false) : setForm(true);

  const fetchOptions = async () => {
    const dbList = await axios.get(`http://${ipControl}`)
    setOptions(dbList.data)
  }

  const getInfosAndStatus = async (branchNumber) => {
    await axios.get(`http://${ipControl}/${branchNumber}/`)
      .then((response) => { setInfosAndStatus(response.data) })
  }

  const getEvents = async (branchNumber) => {
    await axios.get(`http://${ipControl}/eventos-agencia/${branchNumber}`)
      .then(response => setEvents(response.data.controle))
      .catch(e => console.log(e))
  };

  useEffect(() => {
    fetchOptions()
  }, []) // TIREI O OPTIONS DAQUI ******************************************************************************************************************

  useEffect(() => {
    setReport(false)
  }, [selectedBranch])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent={'space-between'} >
              <Stack direction="row" sx={{ alignItems: 'center' }} >
                <Box
                  component="form"
                  onSubmit={(event) => { event.preventDefault(), handleSubmit(event, selectedBranch.numero_ag) }}
                  sx={{ display: 'flex' }}
                >
                  {!employeeBtn ?
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
                    /> :
                    <Autocomplete
                      disabled
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
                    />}
                  {/* <TextField sx={{ m: 1, width: 200 }}
                    required
                    type="date"
                    size="small"
                    id='data-field'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  /> */}
                  {selectedBranch && !employeeBtn
                    ?
                    <IconButton
                      color="primary"
                      size="large"
                      type="submit"
                      onClick={() => { setReport(true), setForm(false), getInfosAndStatus(selectedBranch.numero_ag), getEvents(selectedBranch.numero_ag) }}>
                      <SearchIcon fontSize="inherit" />
                    </IconButton>
                    :
                    null}
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
            <BranchFormControl
              updateOptions={fetchOptions}
              data={{ branch: selectedBranch }}
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
            /> : null}
        </Grid>
        <Grid item xs={12}>
          {employeeBtn === true ?
            <EmployeeFormControl
              setEmployeeBtn={setEmployeeBtn}
              showReport={showReport}
              infosAndStatus={infosAndStatus}
              getInfosAndStatus={getInfosAndStatus}
              data={selectedBranch}
            />
            : null}
        </Grid>
        <Grid item xs={12}>
          {changes && selectedBranch ?
            <UpdateBranchControl
              showReport={showReport}
              showChanges={showChanges}
              updateOptions={fetchOptions}
              data={{ branch: selectedBranch }}
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
            />
            : null}

          {report && selectedBranch ?
            <BranchInfoControl
              setLoading={setLoading}
              loading={loading}
              showReport={showReport}
              showChanges={showChanges}
              updateOptions={fetchOptions}
              data={{ branch: selectedBranch }}
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
              setEmployeeBtn={setEmployeeBtn}
              setInfosAndStatus={setInfosAndStatus}
              infosAndStatus={infosAndStatus}
              getInfosAndStatus={getInfosAndStatus}
              getEvents={getEvents}
              events={events}
            />
            : null}
        </Grid>
      </Grid>
    </>
  )
};

