import React, { Component } from 'react';

export default class YoIframe extends Component {

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.content = (<iframe {...this.props} title={this.props.title} onLoad={this.onLoad} />);
    this.state = { };
  }

  onLoad() {
//    console.log('onLoad');
    const { onLoad } = this.props
    if (onLoad) {
      onLoad(false);
    }
  }

  render() {

    return (<iframe title={this.props.title} src={this.props.src} 
      width="100%" height="100%" onLoad={this.onLoad} />);
  }

}