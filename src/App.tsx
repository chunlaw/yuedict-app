import React, { useContext } from 'react';
import './App.css';
import { Button, Container } from '@mui/material';
import DbContext from './DbContext';

function App() {
  const { db } = useContext(DbContext)

  return (
    <Container maxWidth="xs">
      <Button
        onClick={() => {
          
        }}
      >
        {JSON.stringify(db['一'])}
      </Button>
    </Container>
  );
}

export default App;
