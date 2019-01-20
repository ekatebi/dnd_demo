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
    this.state = { size: {} };
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

    const { title, tag } = this.props;
    const { left, height } = this.state.size;

    const TagName = this.components[tag || 'DonutChart'];

    return (
      <YoDragSource {...this.props} onResize={this.resize} >
        {left ? <TagName {...this.props} height={height} /> : <div>{title || tag}</div>}
      </YoDragSource>
    );
  }

}