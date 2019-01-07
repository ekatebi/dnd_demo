import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { dndTypes } from '../constants/yoDnD';
import classNames from 'classnames';
import '../style/dnd.scss';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const yoDropTargetContract = {

  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    // const item = monitor.getItem();
    const isOver = monitor.isOver();
    
    return isOver; // canMakeChessMove(item.fromPosition, props.position);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    // const clientOffset = monitor.getClientOffset();
    // const componentRect = findDOMNode(component).getBoundingClientRect();

    // console.log('componentRect', componentRect);
    // console.log('clientOffset', clientOffset);

    // You can check whether we're over a nested drop target
    // const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    const item = monitor.getItem();

    const clientOffset = monitor.getClientOffset();

    var event = new CustomEvent("repos", {
        detail: {
          id: item.id,
          clientOffset,
          parentNode: findDOMNode(component)
        }
      });

    window.dispatchEvent(event);

    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class YoDropTarget extends Component {

  render() {

    const { isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={classNames('dnd-drop-target', isOver ? 'is-over' : '')} >

      </div>
    );
  }
}

export default DropTarget(dndTypes.YO_COMP, yoDropTargetContract, collect)(YoDropTarget);
