import React, { Component } from 'react';
import * as d3 from "d3";
import Iframe from '../components/yoIframe.js'
import DonutChart from '../components/donutChart.js'
import HcDonutChart from '../components/charts/donutChart.js'
import HcLineChart from '../components/charts/lineChart.js'
import YoDragSource from '../components/yoDragSource.js'
import YoDraggable from '../components/yoDraggable.js'

export default class YoDraggables extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  data = [
      {name: "USA", value: 40},
      {name: "UK", value: 20},
      {name: "Canada", value: 30},
      {name: "Maxico", value: 10},
      {name: "other", value: 10}
    ];

  render() {

    return (
        <div className="dnd-drag-items">
          <YoDraggable tag="DonutChart" data={this.data} colorRange={d3.schemeAccent} id={0} />
          <YoDraggable tag="Iframe" id={1} width="99%" height="99%" title="chart"
              src="https://j5dash.yottaa.com/d/o7AbP05mk/third-party-drill-down?orgId=1&refresh=5m&panelId=2&fullscreen&from=now-7d&to=now"
          />

          <YoDraggable tag="HcDonutChart" id={2} />
          <YoDraggable tag="HcLineChart" id={3} />
          <YoDraggable tag="HcLineChart" id={4} />
          <YoDraggable tag="HcLineChart" id={5} />
        
        </div>
    );
  }

}