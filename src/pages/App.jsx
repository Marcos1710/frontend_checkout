import React from 'react'
import './App.css';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Layout from '../components/Layout'

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Layout />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
