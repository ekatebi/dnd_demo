import React, { Component } from 'react';

export default class YoIframe extends Component {

  // constructor(props) {
  //   super(props);
  //   this.onLoad = this.onLoad.bind(this);
  //   this.state = { };
  // }

  // onLoad() {
  //   console.log('onLoad');
  //   // const { onLoad } = this.props
  //   // if (onLoad) {
  //   //   onLoad(false);
  //   // }
  // }
  // onLoad={this.onLoad} 

// style="margin: 0; padding: 0; border: none; width:100%; position:relative; top:-50px; overflow:hidden; margin-bottom: -70px;"
//         <input type="text" value={this.props.src} style={{width: '100%', height: '30px'}} />

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} >
        <iframe title={this.props.title} src={this.props.src}
        width={'100%'} height={'100%'} frameBorder={0} />
      </div>);
  }

}