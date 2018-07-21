import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';

import MenuBar from './Components/MenuBar';
import Routes from './Routes';

const theme = createMuiTheme({
  palette: {
    primary: { 
          main: '#002266',
          contrastText: '#fff',
    },
    secondary: { 
          main: '#cc6600',
          contrastText: '#fff',
    },
  },
});

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <MenuBar />
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;