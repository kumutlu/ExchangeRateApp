import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Box from './components/Toggle';
// import Bank from './components/Bank';
import './App.css';

class App extends Component {
  // state = {
  //   currencies: {}
  // };

  render() {
    return (
      <div className='App'>
        <div>
          <Header />
        </div>
        <div>
          <Calculator />
        </div>
        <div>
          <Box />
        </div>
      </div>
    );
  }
}
export default App;
