import React, { Component } from 'react';

export default class YoIframe extends Component {

  render() {
    return (<iframe {...this.props} />);
  }

}