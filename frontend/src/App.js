import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import Container from 'react-bootstrap/Container';

function App() {

  return (
    <div className="App">
      <NavBar />
      {/* <Container> */}
        <Routes />
      {/* </Container> */}
    </div>
  );
}

export default App;
