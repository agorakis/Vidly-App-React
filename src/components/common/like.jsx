import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "clickable fa fa-heart";
    if (this.props.liked !== true) {
      classes += "-o";
    }
    return (
      <i className={classes} aria-hidden="true" onClick={this.props.onLike}></i>
    );
  }
}

export default Like;
