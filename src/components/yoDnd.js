import React, { Component } from 'react';
import YoDropTarget from '../components/yoDropTarget.js'
import YoDraggables from '../components/yoDraggables.js'

export default class YoDnd extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dnd">
        <YoDraggables />
        <YoDropTarget />
      </div>
    );
  }
}
