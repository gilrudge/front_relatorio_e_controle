import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, hour, event, sequency, crc) {
  return { id, date, hour, event, sequency, crc };
}

const rows = [
  createData(
    5,
    '07/12/2022',
    '12:16:40',
    'Desbloqueado por Controle',
    '00006',
    's0251fsg',
  ),
  createData(
    4,
    '07/12/2022',
    '12:16:30',
    'Bloqueado por Metal',
    '00005',
    'f2575dsh',
  ),
  createData(
    3,
    '07/12/2022',
    '12:15:02',
    'Contador Entrada: 3',
    '00004',
    'ndxwp032',
  ),
  createData(
    2,
    '07/12/2022',
    '12:13:42',
    'Contador Entrada: 2',
    '00003',
    'afp236pd',
  ),
  createData(
    1,
    '07/12/2022',
    '12:12:05',
    'Contador Saída: 1',
    '00002',
    'ac742klc',
  ),
  createData(
    0,
    '07/12/2022',
    '12:07:21',
    'Contador Entrada: 1',
    '00001',
    'f41278dd',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Relatório de Acesso</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 600}}>Data</TableCell>
            <TableCell sx={{fontWeight: 600}}>Horário</TableCell>
            <TableCell sx={{fontWeight: 600}}>Evento</TableCell>
            <TableCell sx={{fontWeight: 600}}>Sequência</TableCell>
            <TableCell sx={{fontWeight: 600}}>CRC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.hour}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell>{row.sequency}</TableCell>
              <TableCell>{row.crc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mais
      </Link>
    </React.Fragment>
  );
}
