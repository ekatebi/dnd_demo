import React, { Component } from 'react';
import Iframe from '../components/yoIframe.js'
import DonutChart from '../components/donutChart.js'
import HcDonutChart from '../components/charts/donutChart.js'
import HcLineChart from '../components/charts/lineChart.js'
import YoDragSource from '../components/yoDragSource.js'

export default class YoDraggable extends Component {

  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {};
  }

  components = {
    DonutChart,
    HcDonutChart,
    HcLineChart,
    Iframe
  };

  resize(size) {
    this.setState({size});
  }

  render() {
    const TagName = this.components[this.props.tag || 'DonutChart'];
    return (
      <YoDragSource {...this.props} onResize={this.resize} >
        <TagName {...this.props} height={this.state.size} />
      </YoDragSource>
    );
  }

}