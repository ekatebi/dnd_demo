import React, { Component } from 'react';
// import logo from './logo.svg';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import './style/App.scss';
import YoDropTarget from './components/yoDropTarget.js'
import YoDraggables from './components/yoDraggables.js'

class App extends Component {

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

        <YoDraggables />
        <YoDropTarget />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
