import React, { Component } from 'react';
import './App.css';
import SwapiPeopleTable from './components/SwapiPeopleTable.jsx'

class App extends Component {
  render() {
    return <div style={{ padding: 20 }}>
        <SwapiPeopleTable />
      </div>;
  }
}

export default App;
