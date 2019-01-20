import React, { Component } from 'react';
import YoDraggable from '../components/yoDraggable.js'

export default class YoDraggables extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    let id = 0;

    return (
        <div className="dnd-drag-items">

          <YoDraggable tag="YoDropTarget" title="Canvas" id={id++} />

          <YoDraggable tag="DonutChart" id={id++} />

          <YoDraggable tag="Iframe" width="100%" height="100%" title="Grafana" id={id++}
              src="https://j5dash.yottaa.com/d/o7AbP05mk/third-party-drill-down?orgId=1&refresh=5m&panelId=2&fullscreen&from=now-7d&to=now"
          />

          <YoDraggable tag="HcDonutChart" id={id++} />
          <YoDraggable tag="HcLineChart" id={id++} />
          <YoDraggable tag="HcLineChart" id={id++} />
          <YoDraggable tag="HcLineChart" id={id++} />
        
        </div>
    );
  }

}