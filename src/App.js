import React, { Component } from 'react';
// import logo from './logo.svg';
import * as d3 from "d3";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
// import 'font-awesome/scss/font-awesome.scss';

// import './App.css';
import './style/App.scss';
import DonutChart from './components/donutChart.js'
import HcDonutChart from './components/charts/donutChart.js'
import HcLineChart from './components/charts/lineChart.js'
import YoDropTarget from './components/yoDropTarget.js'
import YoDragSource from './components/yoDragSource.js'
import YoDraggable from './components/yoDraggable.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    var data = [
      {name: "USA", value: 40},
      {name: "UK", value: 20},
      {name: "Canada", value: 30},
      {name: "Maxico", value: 10},
      {name: "other", value: 10}
    ];

              // <HcDonutChart />
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
          <YoDraggable tag="DonutChart" data={data} colorRange={d3.schemeAccent} id={0} />
          <YoDraggable tag="Iframe" id={1} width="100%" height="100%" title="chart"
              src="https://j5dash.yottaa.com/d/o7AbP05mk/third-party-drill-down?orgId=1&refresh=5m&panelId=2&fullscreen&from=now-7d&to=now"
          />

          <YoDragSource id={4} onResize={(height4) => {
            // console.log(height4);
            this.setState({height4});
          }} >
            <HcDonutChart id={4} height={this.state.height4} />
          </YoDragSource>

          <YoDragSource id={5} onResize={(height5) => {
            // console.log(height4);
            this.setState({height5});
          }} >
            <HcLineChart id={5} height={this.state.height5} />
          </YoDragSource>

          <YoDragSource id={6} onResize={(height6) => {
            // console.log(height4);
            this.setState({height6});
          }} >
            <HcLineChart id={6} height={this.state.height6} />
          </YoDragSource>

        </div>
        <YoDropTarget />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
