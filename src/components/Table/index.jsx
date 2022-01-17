import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';

import { checkoutsAPi } from '../../services/checkouts'
import moment from 'moment'

const columns = [
  { name: 'product_name', label: 'Produto', minWidth: 100, align: 'center', },
  { 
    name: 'value_brl', 
    label: 'R$', 
    minWidth: 100, 
    align: 'center', 
    format: (value) => value.toLocaleString('en-US') 
  },
  {
    name: 'value_usd',
    label: '$',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    name: 'client_name',
    label: 'Cliente',
    minWidth: 100,
    align: 'center',
  },
  {
    name: 'client_mail',
    label: 'E-mail',
    minWidth: 100,
    align: 'center',
  },
  {
    name: 'client_address',
    label: 'Endereço',
    minWidth: 100,
    align: 'center',
  },
  {
    name: 'purchase_date',
    label: 'Compra',
    minWidth: 100,
    align: 'center',
  },
];

export default function StickyHeadTable() {
  const [loading, setLoading] = React.useState(false)
  const [rows, setRows] = React.useState([])
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    list()
  }, [])

  // lista todos os checkouts
  const list = async () => {
    setLoading(true)

    try {
      const response = await checkoutsAPi.get(1, 50)
      setRows(response.data)
    } catch (e) {
      setError(true)
    }  finally {
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  const formatDate = (date) => {
    if (moment(date).isValid())
      return moment(date).format("DD/MM/YYYY")  

    return moment().format("DD/MM/YYYY")
  } 

  return (
    <>
      {loading ? 
        <Backdrop
          open={loading}
          sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          Carregando... <CircularProgress color="inherit" />
        </Backdrop> : 
        error ? 
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Ops... Ocorreu um erro interno com o servidor!
          </Alert>
        </Snackbar> :
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ minWidth: 1100 }}>
            <Table stickyHeader aria-label="sticky table" size='small'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.name}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.product_name}
                    </TableCell>
                    <TableCell align="center">{row.value_brl}</TableCell>
                    <TableCell align="center">{row.value_usd}</TableCell>
                    <TableCell align="center">{row.client_name}</TableCell>
                    <TableCell align="center">{row.client_mail}</TableCell>
                    <TableCell align="center">{row.client_address}</TableCell>
                    <TableCell align="center">{formatDate(row.purchase_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      }
    </>
  );
}
