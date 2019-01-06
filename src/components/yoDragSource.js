import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import 'font-awesome/scss/font-awesome.scss';
import { dndTypes} from '../constants/yoDnDTypes'; 
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

    draggingItem && console.log('isDragging', props.id);
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

    console.log('beginDrag', item.id);

    // add an appropriate event listener
    window.addEventListener("repos", component.updatePos);

    return item;
  },

  endDrag(props, monitor, component) {

    console.log('endDrag', props.id );

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

  mousedownPos(e) {
    var { node } = this;
    if (this.corner) {
      node.removeChild(this.corner);
      this.corner = undefined;
    }

    var offset = node.getClientRects()[0];
    var mousedown = {
      x: Math.round(e.clientX - offset.left),
      y: Math.round(e.clientY - offset.top)
    };

    this.setState({ mousedown });
  }

  calcPos(clientOffset, mousedown, parentParam) {
    var delta = Math.round(clientOffset - mousedown)
    var val = Math.floor(delta / 20) * 20;
    parentParam = Math.floor(parentParam / 20) * 20;
    return (val < parentParam ? parentParam + 20 : val) + 'px';
  }

  updatePos(e) {
    var { node } = this;
    var parentRec = e.detail.parentNode.getBoundingClientRect();
    
//    console.log('parentRec', parentRec);

    e.detail.parentNode.appendChild(node);
    node.style.position = 'absolute';
    node.style.left = this.calcPos(e.detail.clientOffset.x, this.state.mousedown.x, parentRec.left);  
    node.style.top = this.calcPos(e.detail.clientOffset.y, this.state.mousedown.y, parentRec.top);

    // node.style.left = this.calcPos(e.detail.clientOffset.x - parentRec.left, this.state.mousedown.x);  
    // node.style.top = this.calcPos(e.detail.clientOffset.y - parentRec.top, this.state.mousedown.y);

    // if (!this.corner) {
    //   this.corner = node.appendChild(document.createElement('div'));
    //   this.corner.classList.add('active');
    // }

    this.setState({ active: true });

  }

  render() {
    // Your component receives its own props as usual
    
    var { node } = this;
    const { active } = this.state;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { id, isDragging, connectDragSource } = this.props;

    let head, foot;

    if (active) {
      head = (<span className="head">
          <i className="fa fa-arrows fa-lg"></i>
        </span>);

      foot = (<span className="foot">
          <i className="fa fa-expand fa-lg fa-flip-horizontal"></i>
        </span>);
    }

    return connectDragSource(
      <div className={classNames('dnd-drag-source', isDragging ? 'is-dragging' : '')}>
          {head}
          {id}
          {/* <div>{this.state.mousedown && this.state.mousedown.x}</div>
          <div>{this.state.mousedown && this.state.mousedown.y}</div> */}
          <div>{this.node && node.style.left}</div>
          <div>{this.node && node.style.top}</div>
          {/* isDragging && ' (and I am being dragged now)' */}
          {foot}
      </div>
    );
  }
  
}

export default DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect)(YoDragSource);
