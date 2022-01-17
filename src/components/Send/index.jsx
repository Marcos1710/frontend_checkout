import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { checkoutsAPi } from '../../services/checkouts'
import { data } from '../../utils/send.js'

function Send() {
  const [value, setValue] = useState(data)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [typeMessage, setTypeMessage] = useState("")
  const [textMessage, setTextMessage] = useState("")

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const sendFile = async () => {
    try {
      setLoading(true)
      const dataJson = JSON.parse(value)

      checkoutsAPi.post(dataJson).then(() => {
        setMessage(true)
        setTypeMessage("success")
        setTextMessage("Dados salvos com sucesso!")
      }).catch(() => {
        setMessage(true)
        setTypeMessage("error")
        setTextMessage("Ops... Ocorreu um erro interno com o servidor!")
      }).finally(() => setLoading(false))
    } catch (e) {
      setMessage(true)
      setTypeMessage("error")
      setTextMessage("Ops... Ocorreu um erro interno com o servidor!")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage(false);
  };

  return (
    <>
      <Snackbar
        open={message}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeMessage} sx={{ width: '100%' }}>
          {textMessage}
        </Alert>
      </Snackbar> 
      {loading ? 
        <Backdrop
          open={loading}
          sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          Carregando... <CircularProgress color="inherit" />
        </Backdrop> :
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField 
            fullWidth 
            label="Dados de envio (é possível editar este campo)" 
            id="array_send" 
            multiline 
            value={value} 
            onChange={handleChange}
          />
          <br />
          <br />
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => sendFile()}>
            Enviar
          </Button>
        </Box>
      }
    </>
  );
}

export default Send;