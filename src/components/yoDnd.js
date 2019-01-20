import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import YoDropTarget from '../components/yoDropTarget.js'
import YoDraggables from '../components/yoDraggables.js'

class YoDnd extends Component {

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

export default DragDropContext(HTML5Backend)(YoDnd)
