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

    // draggingItem && console.log('isDragging', props.id);
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return draggingItem;
  },

  beginDrag(props, monitor, component) {

    // const componentNode = findDOMNode(component); //.getBoundingClientRect();

    // Return the data describing the dragged item
    const item = { id: props.id, node: component.node };

    // console.log('beginDrag', item.id);

    // add an appropriate event listener
    window.addEventListener("repos", component.updatePos);

    return item;
  },

  endDrag(props, monitor, component) {

    // console.log('endDrag', props.id );

    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    window.removeEventListener("repos", component.updatePos);

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
//    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
//    const dropResult = monitor.getDropResult();

    // const clientOffset = monitor.getClientOffset();
    // const componentRect = findDOMNode(component).getBoundingClientRect();
    // console.log('endDrag componentRect', componentRect);


    // console.log('dropResult', dropResult);

    // This is a good place to call some Flux action
    // CardActions.moveCardToList(item.id, dropResult.listId);
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
    var delta = Math.round(clientOffset - mousedown + scroll);
    var val = Math.floor(delta / GRID_SPACING) * GRID_SPACING;
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

    this.setState({ active: true, parentTop, styleLeft, styleTop });
  }

  render() {
    // Your component receives its own props as usual
    
    var { node } = this;
    const { active, isMouseInside, parentTop, parentLeft, styleLeft, styleTop } = this.state;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
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

    let val;

    if (styleTop && parentTop) {
      val = styleTop - parentTop;
    }

    return connectDragPreview(
      <div className={classNames('dnd-drag-source',  
          isMouseInside || isDragging ? 'is-dragging' : '')}>
          {head}
          {id}
          {/* <div>{this.state.mousedown && this.state.mousedown.x}</div>
          <div>{this.state.mousedown && this.state.mousedown.y}</div> */}
          <div>{this.node && active ? styleLeft : ''}</div>
          <div>{this.node && active ? val : ''}</div>
          {/* isDragging && ' (and I am being dragged now)' */}
          {foot}
      </div>
    );
  }
  
}

export default DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect)(YoDragSource);
