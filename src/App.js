import React, { Component } from 'react';
// import logo from './logo.svg';
import * as d3 from "d3";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
// import 'font-awesome/scss/font-awesome.scss';

// import './App.css';
import './style/App.scss';
import DonutChart from './components/donutChart.js'
import YoDropTarget from './components/yoDropTarget.js'
import YoDragSource from './components/yoDragSource.js'

class App extends Component {
  render() {

    var data = [
      {name: "USA", value: 40},
      {name: "UK", value: 20},
      {name: "Canada", value: 30},
      {name: "Maxico", value: 10},
      {name: "other", value: 10}
    ];

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
        
        <div className="dnd-drag-items">
          <YoDragSource id={0}>
            <DonutChart data={data} colorRange={d3.schemeAccent} id={1} />
          </YoDragSource>
          <YoDragSource id={1}>
            <DonutChart data={data} colorRange={d3.schemePastel1} id={0} />
          </YoDragSource>
          <YoDragSource id={5}>
            <div>
              <DonutChart data={data} colorRange={d3.schemeCategory10} id={2} />
            </div>
          </YoDragSource>
          <YoDragSource id={2} />
          <YoDragSource id={3} />
          <YoDragSource id={4} />
        </div>
        <YoDropTarget />

      </div>
    );
  }
}

// export default App;

export default DragDropContext(HTML5Backend)(App)
