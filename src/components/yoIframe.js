import React, { Component } from 'react';

export default class YoIframe extends Component {

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.content = (<iframe {...this.props} title={this.props.title} onLoad={this.onLoad} />);
    this.state = { };
  }

  // componentWillUpdate(prevProps) {
  //   console.log('componentWillUpdate');
  //   const { onLoad } = this.props
  //   if (onLoad) {
  //     onLoad(true);
  //     this.content = undefined;
  //     this.setState({timestamp: +new Date()});
  //   }

  // }

  // componentDidUpdate(prevProps) {
  //   console.log('componentDidUpdate');
  //   if (!this.content) {
  //     this.content = (<iframe {...this.props} title={this.props.title} onLoad={this.onLoad} />);

  //     console.log('componentDidUpdate', this.content);

  //     this.setState({timestamp: +new Date()});
  //   }
  // }

  onLoad() {
//    console.log('onLoad');
    const { onLoad } = this.props
    if (onLoad) {
      onLoad(false);
    }
  }

  render() {

//    const {content} = this;

//    console.log('render', content);

    return (<iframe {...this.props} title={this.props.title} onLoad={this.onLoad} />);
    // return (<div>
    //     {content}
    //   </div>);
  }

}