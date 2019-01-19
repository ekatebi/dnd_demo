import React, { Component } from 'react';
import Iframe from '../components/yoIframe.js'
import DonutChart from '../components/donutChart.js'
import HcDonutChart from '../components/charts/donutChart.js'
import HcLineChart from '../components/charts/lineChart.js'
import YoDragSource from '../components/yoDragSource.js'

export default class YoDraggable extends Component {

  components = {
    DonutChart,
    HcDonutChart,
    HcLineChart,
    Iframe
  };

  render() {
    const TagName = this.components[this.props.tag || 'DonutChart'];
    return (
      <YoDragSource {...this.props} >
        <TagName {...this.props} />
      </YoDragSource>
    );
  }

}