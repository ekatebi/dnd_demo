import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import YoDropTarget from '../components/yoDropTarget.js'
import YoDraggables from '../components/yoDraggables.js'
import shortid from 'shortid';

import YoDraggable from '../components/yoDraggable.js'

class YoDnd extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

// <div style={{ backgroundColor: 'blue', zIndex: 100, position: 'absolute', top: 0, left: 0, height: 100, width: 100 }} />
//            <YoDraggable tag="HcDonutChart" style={{ position: 'absolute', top: 0, left: 0 }} />


  render() {
    return (
      <div className="dnd">
        <YoDraggables />
        <YoDropTarget id={shortid.generate()} main={true} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(YoDnd)
