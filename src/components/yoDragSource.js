import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import 'font-awesome/scss/font-awesome.scss';
import { dndTypes, GRID_SPACING } from '../constants/yoDnD'; 
import '../style/dnd.scss';
import classNames from 'classnames';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const yoDragSourceContract = {

  canDrag(props) {
    // You can disallow drag based on props
    return true;// props.isReady;
  },

  isDragging(props, monitor) {
    var draggingItem = monitor.getItem().id === props.id 
    return draggingItem;
  },

  beginDrag(props, monitor, component) {

    const item = { id: props.id, node: component.node };

    window.addEventListener("repos", component.updatePos);

    return item;
  },

  endDrag(props, monitor, component) {

    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    window.removeEventListener("repos", component.updatePos);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class YoDragSource extends Component {

  constructor(props) {
    super(props);
    this.updatePos = this.updatePos.bind(this);
    this.mousedownPos = this.mousedownPos.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.node = findDOMNode(this);
    this.node.addEventListener('mousedown', this.mousedownPos, false);
  }

  componentWillUnmount() {
    this.node.removeEventListener("mousedown", this.mousedownPos);
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  }

  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  }  

  mousedownPos(e) {
    var { node } = this;

    var offset = node.getClientRects()[0];
    var mousedown = {
      x: Math.round(e.clientX - offset.left),
      y: Math.round(e.clientY - offset.top)
    };

    this.setState({ mousedown });
  }

  calcPos(clientOffset, mousedown, parentParamEx, scroll) {
    var val = Math.round(clientOffset - mousedown + scroll);    
    val = Math.floor(val / GRID_SPACING) * GRID_SPACING;
    var parentParam = Math.round(parentParamEx + scroll);
    parentParam = Math.floor(parentParam / GRID_SPACING) * GRID_SPACING;
    return (val < parentParam + GRID_SPACING ? parentParam + GRID_SPACING : val);
  }

  updatePos(e) {
    var { node } = this;
    var parentRec = e.detail.parentNode.getBoundingClientRect();

    
    e.detail.parentNode.appendChild(node);

    node.style.position = 'absolute';
    const styleLeft = 
      this.calcPos(e.detail.clientOffset.x, this.state.mousedown.x, parentRec.left, window.scrollX);
    const styleTop = 
      this.calcPos(e.detail.clientOffset.y, this.state.mousedown.y, parentRec.top, window.scrollY);
    
    node.style.left = styleLeft + 'px';
    node.style.top = styleTop + 'px';

    let parentTop = Math.round(parentRec.top + window.scrollY);
    parentTop = Math.floor(parentTop / GRID_SPACING) * GRID_SPACING;

    let parentLeft = Math.round(parentRec.left + window.scrollX);
    parentLeft = Math.floor(parentLeft / GRID_SPACING) * GRID_SPACING;

    this.setState({ active: true, parentTop, left: styleLeft - parentLeft, top: styleTop - parentTop });
  }

  render() {
    
    const { active, isMouseInside, top, left } = this.state;

    const { id, isDragging, connectDragSource, connectDragPreview } = this.props;

    let foot;

    const head = connectDragSource(
      <span className="head" >
        <i className="fa fa-arrows fa-lg"
        onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
        </i>
      </span>);

    if (active) {
      foot = (<span className="foot" >
          <i className="fa fa-expand fa-lg fa-flip-horizontal"></i>
        </span>);
    }

    return connectDragPreview(
      <div className={classNames('dnd-drag-source',  
          isMouseInside || isDragging ? 'is-dragging' : '')}>
          {head}
          {id}
          <div>{this.node && active ? left : ''}</div>
          <div>{this.node && active ? top : ''}</div>
          {foot}
      </div>
    );
  }
  
}

export default DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect)(YoDragSource);
