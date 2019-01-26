import React, { Component } from 'react';
// import logo from './logo.svg';

import './style/App.scss';
// import YoDnd from './components/yoDnd.js'
import AppRouter from './components/routers/appRouter.js'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

        {/* <YoDnd /> */}

        <AppRouter />

      </div>
    );
  }
}
