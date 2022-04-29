import React, { Component } from "react";
//import { Scrollbars } from "react-custom-scrollbars";

export default class CapxScrollbars extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderView({ style, ...props }) {
    const viewStyle = {
      paddingRight: 12,
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: `#172623`,
      borderRadius: 10,
      width: 4,
    };
    return (
      <div
        className="thumb-scroll"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  }

  render() {
    return null;
    // <Scrollbars
    //     renderView={this.renderView}
    //     renderThumbHorizontal={this.renderThumb}
    //     renderThumbVertical={this.renderThumb}
    //     {...this.props}/>
  }
}
