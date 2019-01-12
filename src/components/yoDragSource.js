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

    const item = { id: props.id, node: component.state.node };

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
    const node = findDOMNode(this);
    node.addEventListener('mousedown', this.mousedownPos, false);
    this.setState({ node });
  }

  componentWillUnmount() {
    this.state.node.removeEventListener("mousedown", this.mousedownPos);
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  }

  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  }  

  mousedownPos(e) {
    var { node } = this.state;

    var offset = node.getClientRects()[0];
    var mousedown = {
      x: Math.round(e.clientX - offset.left),
      y: Math.round(e.clientY - offset.top)
    };

    this.setState({ mousedown });
  }

  calcPosX(clientOffset, mousedown, parentParamEx, scroll) {
    var val = Math.round(clientOffset - mousedown + scroll);
    val = Math.floor(val / GRID_SPACING) * GRID_SPACING;
    var parentParam = Math.round(parentParamEx + scroll);
    parentParam = Math.floor(parentParam / GRID_SPACING) * GRID_SPACING;
    return (val < parentParam + GRID_SPACING ? parentParam + GRID_SPACING : val);
  }

  calcPos(clientOffset, mousedown, parentParamEx, scroll, label) {
    var val = Math.round(clientOffset - mousedown + scroll);
    val -= (val - parentParamEx)%GRID_SPACING;
    return (val < parentParamEx + GRID_SPACING ? parentParamEx + GRID_SPACING : val);
  }

  updatePos(e) {
    var { node } = this.state;
    // var parentRec = e.detail.parentNode.getBoundingClientRect();
    var parentRec = e.detail.parentRec;
    
    e.detail.parentNode.appendChild(node);

    node.style.position = 'absolute';

    let parentTop = parentRec.top - 10;
    let parentLeft = parentRec.left - 10;

    const styleLeft = 
      this.calcPos(e.detail.clientOffset.x, this.state.mousedown.x, parentLeft, window.scrollX, 'left');

    const styleTop = 
      this.calcPos(e.detail.clientOffset.y, this.state.mousedown.y, parentTop, window.scrollY, 'top');
    
    node.style.left = styleLeft + 'px';
    node.style.top = styleTop + 'px';

    this.setState({ active: true,
      left: styleLeft - parentLeft, 
      top: styleTop - parentTop,
      parentRec });
  }

  render() {

    const { id, isDragging, connectDragSource, connectDragPreview } = this.props;
    const { node, active, isMouseInside, top, left, 
      parentRec } = this.state;

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

    const rec = node && node.getBoundingClientRect();

          // <div>{node && active ? left : ''}</div>
          // <div>{node && active ? top : ''}</div>

          // <div>{node && active ? left : ''}</div>
          // <div>{node && active ? top : ''}</div>

    return connectDragPreview(
      <div className={classNames('dnd-drag-source',  
          isMouseInside || isDragging ? 'is-dragging' : '')}>
          {head}
          {id}
          <div>{node && active && `${left}, ${top}`}</div>
          <div>{rec && `${rec.left}, ${rec.top}`}</div>
          <div>{parentRec && `${parentRec.left}, ${parentRec.top}`}</div>
          {foot}
      </div>
    );
  }
  
}

export default DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect)(YoDragSource);
