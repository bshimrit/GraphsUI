import React, { Component } from "react";

import "./NodesDisplay.css";

class NodesDisplay extends Component {
  render() {
    return (
      <div
        className={
          "nodes-display " + (this.props.reverse ? "reverse" : "not-reverse")
        }
      >
        {this.renderNodes()}
      </div>
    );
  }

  renderNodes() {
    var curNodes = this.props.nodes.slice();
    if (this.props.reverse) curNodes.reverse();

    return curNodes.map(node => {
      return <div key={node}>{node}</div>;
    });
  }
}

export default NodesDisplay;
