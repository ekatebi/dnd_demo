import React, { Component } from 'react';
import YoDraggable from '../components/yoDraggable.js'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actions from '../actions/dnd';
import shortid from 'shortid';
import { 
  DRAGGABLES
} from '../constants/yoDnD'; 

class YoDraggables extends Component {

  constructor(props) {
    super(props);
    this.state = { alt: false, 
//      list: [...this.listWithId()]
      list: [...DRAGGABLES]
    };
  }

  removeFromList(tag) {
    tag = !tag && this.state.list.length > 0 ? this.state.list[0].tag : tag;
    const list = this.state.list.filter((item) => {
      return item.tag !== tag;
    });

    this.setState({ list });
  }

  listWithId() {
    return DRAGGABLES.map((item) => {
      return {...item, id: shortid.generate()};
    });
  }

  componentWillReceiveProps(nextProps) { 
    const { tagToReplenish, timestamp } = nextProps;

//    console.log('componentWillReceiveProps', nextProps, this.props);

    if (tagToReplenish && this.props.timestamp !== timestamp) { 

      const index = this.list.findIndex((item) => {
//        console.log('find', tag, tagToReplenish);
        return item.tag === tagToReplenish;
      });

//      console.log('tagToReplenish', tagToReplenish, index);
      // const list = [...this.state.list];
      // list.splice(index, 0, {...this.list[index], id: shortid.generate() });
      // console.log('list', list);
      // this.setState({list, index});

    }
  }

  render() {
    const { tagToReplenish, timestamp } = this.props;
    const { list } = this.state;

//    console.log('render', list);

    return (

      <div className="dnd-drag-items" onClick={() => {
//        this.setState({alt: !this.state.alt});
        this.removeFromList();
      }} >{list
        // .filter((item) => {
        //   return !item.hidden;
        // })
        .map((item, index) => {
        return (<YoDraggable {...item} key={index} />);
      })}

      </div>

      );
  }

}

function mapStateToProps(state) {

  const { timestamp, tagToReplenish, draggables } = state.dnd;

  return {
    timestamp,
    tagToReplenish,
    draggables
  };

}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps)(YoDraggables);
