import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/dnd';
import YoDragSource from '../components/yoDragSource.js'
import YoDropTarget from '../components/yoDropTarget.js'
import Iframe from '../components/yoIframe.js'
import DonutChart from '../components/donutChart.js'
import HcDonutChart from '../components/charts/donutChart.js'
import HcLineChart from '../components/charts/lineChart.js'
// import shortid from 'shortid';

class YoDraggable extends Component {

  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.state = { size: {}, loading: false };
//    this.id = shortid.generate();
  }

  componentWillMount() {
//    console.log('componentWillMount YoDraggable', this.props.id, this.props.tag);
  }

  componentDidMount() {
//    const { regDraggable, tag } = this.props;
//    console.log('componentDidMount YoDraggable', this.props.id, this.props.tag);
//    regDraggable(this.id, tag);
  }

  componentWillUnmount() {
      console.log('componentWillUnmount YoDraggable', this.props.tag);
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

//    console.log('render', this.props.id, this.props.tag);

    const { title, tag, id } = this.props;
    const { size, loading } = this.state;
    const { left, height } = size;

    const TagName = this.components[tag || 'DonutChart'];

    let content;

    if (loading) {
      content = (<div className="loader"></div>);
    } else if (id) {
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

// function mapStateToProps(state) {

//   const { timestamp } = state.dnd;

//   return {
//     timestamp
//   };

// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(undefined, mapDispatchToProps)(YoDraggable);
