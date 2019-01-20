import React, { Component } from 'react';
import YoDragSource from '../components/yoDragSource.js'
import YoDropTarget from '../components/yoDropTarget.js'
import Iframe from '../components/yoIframe.js'
import DonutChart from '../components/donutChart.js'
import HcDonutChart from '../components/charts/donutChart.js'
import HcLineChart from '../components/charts/lineChart.js'

export default class YoDraggable extends Component {

  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.state = { size: {}, loading: false };
  }

  components = {
    YoDropTarget,
    DonutChart,
    HcDonutChart,
    HcLineChart,
    Iframe
  };

  resize(size) {
    this.setState({size});
  }

  onLoad(loading) {
//    console.log("loading", loading);
    this.setState({loading});
  }

  render() {

    const { title, tag } = this.props;
    const { size, loading } = this.state;
    const { left, height } = size;

    const TagName = this.components[tag || 'DonutChart'];

    let content;

    if (loading) {
      content = (<div className="loader"></div>);
    } else if (left) {
      content = (<TagName {...this.props} height={height} onLoad={this.onLoad} />);
    } else {
      content = (<div>{title || tag}</div>);
    }

    return (
      <YoDragSource {...this.props} onResize={this.resize} >
        {content}
      </YoDragSource>
    );
  }

}