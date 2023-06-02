import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Paper from '@mui/material/Paper';
import Title from '../Title';
import axios from 'axios';
import {
  validateEmployee
} from '../../../utils/validate';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import SuccessAlert from '../Alerts/SuccessAlert';
import DenyAlert from '../Alerts/DenyAlert';

export default function EmployeeFormControl(props) {
  
  const colaboradores = props.infosAndStatus.status[0]

  const [registrationEmployee, setRegistrationEmployee] = React.useState();
  const [passwordEmployee, setPasswordEmployee] = React.useState();

  const [employee, setEmployee] = React.useState([ 
    {posição: '00', tipo:'Master', matrícula: colaboradores.M00, senha: colaboradores.M00},
    {posição: '01', tipo:'Nível 1', matrícula: colaboradores.M01, senha: colaboradores.M01},
    {posição: '02', tipo:'Nível 1', matrícula: colaboradores.M02, senha: colaboradores.M02},
    {posição: '03', tipo:'Nível 1', matrícula: colaboradores.M03, senha: colaboradores.M03},
    {posição: '04', tipo:'Nível 1', matrícula: colaboradores.M04, senha: colaboradores.M04},
    {posição: '05', tipo:'Nível 1', matrícula: colaboradores.M05, senha: colaboradores.M05},
    {posição: '06', tipo:'Nível 1', matrícula: colaboradores.M06, senha: colaboradores.M06},
    {posição: '07', tipo:'Nível 1', matrícula: colaboradores.M07, senha: colaboradores.M07},
    {posição: '08', tipo:'Nível 1', matrícula: colaboradores.M08, senha: colaboradores.M08},
    {posição: '09', tipo:'Nível 1', matrícula: colaboradores.M09, senha: colaboradores.M09},
    {posição: '10', tipo:'Nível 1', matrícula: colaboradores.M10, senha: colaboradores.M10},
    {posição: '11', tipo:'Nível 1', matrícula: colaboradores.M11, senha: colaboradores.M11},
    {posição: '12', tipo:'Nível 1', matrícula: colaboradores.M12, senha: colaboradores.M12},
    {posição: '13', tipo:'Nível 2', matrícula: colaboradores.M13, senha: colaboradores.M13},
    {posição: '14', tipo:'Nível 2', matrícula: colaboradores.M14, senha: colaboradores.M14},
    {posição: '15', tipo:'Nível 2', matrícula: colaboradores.M15, senha: colaboradores.M15},
    {posição: '16', tipo:'Nível 2', matrícula: colaboradores.M16, senha: colaboradores.M16},
    {posição: '17', tipo:'Nível 2', matrícula: colaboradores.M17, senha: colaboradores.M17},
    {posição: '18', tipo:'Nível 2', matrícula: colaboradores.M18, senha: colaboradores.M18},
    {posição: '19', tipo:'Nível 2', matrícula: colaboradores.M19, senha: colaboradores.M19},
    {posição: '20', tipo:'Nível 2', matrícula: colaboradores.M20, senha: colaboradores.M20},
    {posição: '21', tipo:'Técnico', matrículaTécnico: colaboradores.M21, senhaTécnico: colaboradores.G21}
  ]);

  const [successAlert, setSuccessAlert] = React.useState();
  const [denyAlert, setDenyAlert] = React.useState();

  const showSuccessAlert = () => successAlert ? setSuccessAlert(false) : setSuccessAlert(true);
  const showdenyAlert = () => denyAlert ? setDenyAlert(false) : setDenyAlert(true);

  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    defaultValues: {
      matrícula: employee.matrícula,
      senha: employee.senha,
      matrículaTécnico: props.infosAndStatus.status[0].M21 == 0 ? "" : props.infosAndStatus.status[0].M21,
      senhaTécnico: props.infosAndStatus.status[0].G21 == 0 ? "" : props.infosAndStatus.status[0].G21
    }
  });
  
  const addEmployee = async (data) => {    
    await axios.get(`http://localhost:4002/add/${props.data.end_ip}/21/${data.matrículaTécnico}/${data.senhaTécnico}`);
  };
  
  const resetEmployee = async (position) => {
    await axios.get(`http://localhost:4002/reset/${props.data.end_ip}/${position}`);
  };

  React.useEffect(() => {
    props.infosAndStatus.length !== 0 ? props.getInfosAndStatus(props.data.numero_ag) : console.log('rodei')
  }, [props.infosAndStatus])
  
  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Box sx={{ m: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Title>Colaboradores</Title>
        </Box>
        <Box>
          {/* <Button variant="outlined" startIcon={<AutorenewIcon />} sx={{mr: 2}} onClick={() => {atualiza()}}>
            Atualizar
          </Button> */}
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => { props.setEmployeeBtn(false), props.showReport() }}>
            Voltar / Atualizar
          </Button>
        </Box>
      </Box>
      <Box
        mt={6}
        // style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        component="form"
        noValidate
        autoComplete="off"
      >
        {
        employee.map((item, index) =>

          item.posição !== '21' ?
        
          <Box sx={{ m: 3, gap: 3 }} style={{ display: 'flex', justifyContent:'flex-start' }} key={index}>
            <Box sx={{ mt: 1, width: '11ch',}}>
              <Typography>
                {item.posição} - {item.tipo}
              </Typography>
            </Box>
            <Box sx={{ gap: 1.5 }} style={{ display: 'flex', justifyContent: 'left' }}>
              <TextField
                sx={{ mb: 3, width: '12ch', height: '3ch' }}
                size="small"
                value={item.matrícula == 0 ? "" : item.matrícula}
                label="Matrícula"              
                disabled
                type="text"
                {...register('matrícula', {
                  pattern: {
                    value: validateEmployee,
                    message: "Matrícula Inválida"
                  }
                })}
                onChange={(e) => e.target.value == item.matrícula}
                error={!!errors?.matrícula}
                helperText={errors?.matrícula ? errors.matrícula.message : null}
              />
              <TextField
                sx={{ mb: 3, width: '12ch', height: '3ch' }}
                size="small"
                value={item.senha == 0 ? "" : item.senha}              
                label="Senha"
                disabled              
                type="password"
                {...register('senha', {
                  pattern: {
                    value: validateEmployee,
                    message: "Senha Inválida"
                  }
                })}
                onChange={(e) => e.target.value == item.senha}
                error={!!errors?.senha}
                helperText={errors?.senha ? errors.senha.message : null}
              />
              <Button disabled sx={{ width: '12ch', height: '5ch' }} variant="contained" >Salvar</Button>
              { item.posição == '00' ?
              <Button sx={{ width: '12ch', height: '5ch' }} onClick={()=>{resetEmployee(item.posição)}} variant="contained" >Excluir</Button> :
              <Button disabled sx={{ width: '12ch', height: '5ch' }} variant="contained" >Excluir</Button>
              }
            </Box>
          </Box>
          : null
          )        
        }

        {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
        {denyAlert ? <DenyAlert textDeny={'Número de Agência já existe!'}></DenyAlert> : null}
      </Box>
      <Box
        // style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(addEmployee)}
      >
          <Box sx={{ m: 3, gap: 3 }} style={{ display: 'flex', justifyContent:'flex-start' }}>
            <Box sx={{ mt: 1, width: '11ch',}}>
              <Typography>
                21 - Técnico
              </Typography>
            </Box>
            <Box sx={{ gap: 1.5 }} style={{ display: 'flex', justifyContent: 'left' }}>
              <TextField
                sx={{ mb: 3, width: '12ch', height: '3ch' }}
                size="small"
                // value={colaboradores.M21 == 0 ? "" : colaboradores.M21}
                label="Matrícula"              
                type="text"
                {...register('matrículaTécnico', {
                  pattern: {
                    value: validateEmployee,
                    message: "Matrícula Inválida"
                  }
                })}
                // onChange={(e) => setRegistrationEmployee(e.target.value)}
                // onChange={(e) => props.setInfosAndStatus(this.status[0][M21] = e.target.value)}
                error={!!errors?.matrículaTécnico}
                helperText={errors?.matrículaTécnico ? errors.matrículaTécnico.message : null}
              />
              <TextField
                sx={{ mb: 3, width: '12ch', height: '3ch' }}
                size="small"
                // value={colaboradores.M21 == 0 ? "" : colaboradores.M21}              
                label="Senha"              
                type="password"
                {...register('senhaTécnico', {
                  pattern: {
                    value: validateEmployee,
                    message: "Senha Inválida"
                  }
                })}
                // onChange={(e) => setPasswordEmployee(e.target.value)}
                // onChange={(e) => props.setInfosAndStatus.status[0].G21(e.target.value)}
                error={!!errors?.senhaTécnico}
                helperText={errors?.senhaTécnico ? errors.senhaTécnico.message : null}
              />
              <Button sx={{ width: '12ch', height: '5ch' }} type="submit" variant="contained" >Salvar</Button> 
              <Button sx={{ width: '12ch', height: '5ch' }} onClick={()=>{resetEmployee(21)}} variant="contained" >Excluir</Button>
            </Box>
          </Box>

        {successAlert ? <SuccessAlert textSuccess={'Agência criada com Sucesso!'}></SuccessAlert> : null}
        {denyAlert ? <DenyAlert textDeny={'Número de Agência já existe!'}></DenyAlert> : null}
      </Box>
    </Paper>
  );
}