import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/dnd';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import 'font-awesome/scss/font-awesome.scss';
import { dndTypes, GRID_SPACING } from '../constants/yoDnD'; 
import '../style/dnd.scss';
import classNames from 'classnames';
import _flow from 'lodash/flow';

const yoDragSourceContract = {

  canDrag(props) {
    // You can disallow drag based on props
    return true;// props.isReady;
  },

  isDragging(props, monitor) {

    const item = monitor.getItem();

    var draggingItem = props.id && item.id === props.id || !props.id && item.idx === props.idx;

    console.log(draggingItem, item.id, props.id, item.idx, props.idx);

    return draggingItem;
  },

  beginDrag(props, monitor, component) {

    if (!component) {
      return {};
    }

    const item = { id: props.id, node: component.state.node, idx: props.idx };

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
    this.minWidth = 120;
    this.minHeight = 120;
    this.remove = this.remove.bind(this);
    this.updatePos = this.updatePos.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mousedownPos = this.mousedownPos.bind(this);
    this.resize = this.resize.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.scroll = this.scroll.bind(this);
    this.state = { width: this.minWidth, height: this.minHeight, id: -1, left: 0, top: 0 };
  }

  componentDidMount() {
    const node = findDOMNode(this);
    node.addEventListener('mousedown', this.mousedownPos);
    window.addEventListener('scroll', this.scroll);
    window.addEventListener('mouseup', this.mouseUp);
    if (!this.props.children) {
      node.style.width = this.state.width + 'px';
      node.style.height = this.state.height + 'px';
    }

    const rec = node.getBoundingClientRect();

    let left = this.state.left;
    let top = this.state.top;

    if (this.props.style) {
      left = this.props.style.left;
      top = this.props.style.top;
    }

    this.setState({ node, rec, left, top,
      parentNode: node.parentNode, parentRec: node.parentNode.getBoundingClientRect() });
  }

  componentWillUnmount() {
    this.state.node.removeEventListener("mousedown", this.mousedownPos);
  }

  scroll(e) {
    const { parentNode, node } = this.state;

    if (parentNode) {
      const parentRec = parentNode.getBoundingClientRect();
      this.setState({ parentRec, rec: node.getBoundingClientRect() });  
    }
  }

  mouseEnter() {
    this.setState({ isMouseInside: true });
  }

  mouseLeave() {
    this.setState({ isMouseInside: false });
  }

  mouseDown(e) {
    const { parentNode } = this.state;
    parentNode.addEventListener('mousemove', this.resize);
    this.setState({ id: this.props.id, resizing: true });
  }

  mouseUp(e) {

    const { parentNode, id } = this.state;
    if (id === this.props.id && parentNode) {

      parentNode.removeEventListener('mousemove', this.resize);

      const { node, width, height } = this.state;

        let wd = Math.floor(width/GRID_SPACING) * GRID_SPACING;
        let ht = Math.floor(height/GRID_SPACING) * GRID_SPACING;

        node.style.width = wd + 'px';
        node.style.height = ht + 'px';

        // this.setState({ timestamp: +new Date() });

        this.setState({ width: wd, height: ht, id: -1, resizing: false }, () => {
//          parentNode.appendChild(node);
          if (this.props.onResize) {
            this.props.onResize({ width: this.state.width, height: this.state.height,
            left: this.state.left, top: this.state.top } );
          }
        });
    }
  }

  mousedownPos(e) {
    
    var { node } = this.state;

    // var offset = node.getClientRects()[0];
    var offset = node.getBoundingClientRect();

    var mousedown = {
      x: Math.round(e.clientX - offset.left),
      y: Math.round(e.clientY - offset.top)
    };

    // was preventing click in reset zoom in high chart happening
//    parentNode && node && parentNode.appendChild(node);

    this.setState({ mousedown });
  }

  resize(e) {

    if (e.which === 1) {

      const { minWidth, minHeight } = this;
      const { node, parentNode, left, top, width, height } = this.state;
      
      const parentRec = parentNode.getBoundingClientRect();

      const x = e.pageX - parentRec.x - window.scrollX;
      const y = e.pageY - parentRec.y - window.scrollY;

      let wd = x - left;
      let ht = y - top;

      if (wd < minWidth) {
        wd = minWidth;
      }

      if (ht < minHeight) {
        ht = minHeight;
      }

      if (wd !== width || ht !== height) {
        this.setState({ width: wd, height: ht }, () => {
          node.style.width = this.state.width + 'px';
          node.style.height = this.state.height + 'px';
          // if (this.props.onResize) {
          //   this.props.onResize(this.state.height);
          // }
        });
      }
    }
  }

  calcPos(clientOffset, mousedown, parent) {
    var val = Math.round(clientOffset - parent - mousedown);
    val -= val%GRID_SPACING;
    return (val < GRID_SPACING ? GRID_SPACING : val);
  }

  updatePos(e) {
    var { node } = this.state;
    var { id, tag, dropDraggable, src } = this.props;

    var dropTargetId = e.detail.dropTargetId;
    var parentNode = e.detail.parentNode;
    var parentRec = parentNode.getBoundingClientRect();
    
//    if (!parentNode.contains(node) && !node.contains(parentNode)) {
//      parentNode.appendChild(node);
//    }

//    node.style.position = 'absolute';

//    if (dropTargetId === this.state.dropTargetId) {

      const left = this.calcPos(e.detail.clientOffset.x, this.state.mousedown.x,
       parentRec.left);

      const top = this.calcPos(e.detail.clientOffset.y, this.state.mousedown.y, 
        parentRec.top);

//  && dropTargetId === this.state.dropTargetId
    
      if (!!id) {
        node.style.left = left + 'px';
        node.style.top = top + 'px';

        this.setState({// active: true,
          left, 
          top,
//          parentRec,
          parentNode
           }, () => {
              if (this.props.onResize) {
                this.props.onResize({ width: this.state.width, height: this.state.height
                // left: this.state.left, top: this.state.top 
              } );
              }
           });

      }

      if (!id) {

        this.setState({ // active: true,
//          parentRec,
          parentNode,
          dropTargetId
           }, () => {
              if (this.props.onResize) {
                this.props.onResize({ width: this.state.width, height: this.state.height
                // left: this.state.left, top: this.state.top 
              } );
              }
           });
          
        dropDraggable(tag, left, top, dropTargetId, src);
      }
  }

  remove(e) {
    const { removeDraggable, id } = this.props;
    e.stopPropagation();
    // this.state.node.style.display = 'none';
    removeDraggable(id);
  }

  render() {

    const { id, children, style,
      isDragging, connectDragSource, connectDragPreview, title, tag} = this.props;

    // active && console.log('style', style);

    const { isMouseInside, top, left, width, height, resizing} = this.state;

    const active = !!id

    const headTitle = active ? title : '';
//    const title = ''
//    const title = active ? `${top}, ${left}, ${width}, ${height}` : '';

    const trash = active ? (<span><i className="fa fa-trash fa-lg head-trash" 
      onClick={this.remove} ></i></span>) : undefined;

    const head = (
      <div className="head" >
        {connectDragSource(<i className="fa fa-arrows fa-lg head-move"
        onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} />)}
        <span className="head-title">{headTitle}</span>
        {trash}
      </div>);

    const foot = (<span className="foot" >
          {active && (
            <i className="fa fa-expand fa-lg fa-flip-horizontal foot-resize" 
              onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
              onMouseDown={this.mouseDown} ></i>)}
        </span>);

     const defaultContent = (
        <div>
          <div>{title || tag}</div>
          {/* <div>{left && top && `${left}, ${top}`}</div>
          <div>{active && width && height && `${width}, ${height}`}</div> */}
        </div>
      );
// isMouseInside || isDragging ?
    return connectDragPreview(
      (<div className={classNames('dnd-drag-source', 'noselect', 
          isMouseInside || isDragging ? 'is-dragging' : '')} style={style} >
          {head}
          <div className="container" style={{ width: width || this.minWidth, 
            height: height || this.minHeight }} >
            {children && !resizing && !isDragging || children && title === 'Canvas' ? children : defaultContent}
          </div>
          {foot}
      </div>)
    );
  }
  
}

// export default DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect)(YoDragSource);

// function mapStateToProps(state) {

//   const { timestamp } = state.dnd;

//   return {
//     timestamp
//   };

// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default _flow(
  DragSource(dndTypes.YO_COMP, yoDragSourceContract, collect),
  connect(undefined, mapDispatchToProps)
)(YoDragSource);
