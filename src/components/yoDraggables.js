import React, { Component } from 'react';

// import Iframe from '../components/yoIframe.js'
// import DonutChart from '../components/donutChart.js'
// import HcDonutChart from '../components/charts/donutChart.js'
// import HcLineChart from '../components/charts/lineChart.js'
// import YoDragSource from '../components/yoDragSource.js'

import YoDraggable from '../components/yoDraggable.js'

export default class YoDraggables extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
        <div className="dnd-drag-items">

          <YoDraggable tag="DonutChart" />

          <YoDraggable tag="Iframe" width="100%" height="100%" title="Grafana"
              src="https://j5dash.yottaa.com/d/o7AbP05mk/third-party-drill-down?orgId=1&refresh=5m&panelId=2&fullscreen&from=now-7d&to=now"
          />

          <YoDraggable tag="HcDonutChart" />
          <YoDraggable tag="HcLineChart" />
          <YoDraggable tag="HcLineChart" />
          <YoDraggable tag="HcLineChart" />
        
        </div>
    );
  }

}