import React, { Component } from "react";

import "./NodesDisplay.css";

class NodesDisplay extends Component {
  render() {
    return (
      <div className="nodes-container">
        <h1>{this.renderHeader()}</h1>
        <div
          className={
            "nodes-display " + (this.props.reverse ? "reverse" : "not-reverse")
          }
        >
          {this.renderNodes()}
        </div>
      </div>
    );
  }

  renderHeader() {
    var header = "";
    if (this.props.nodes.length) header = "Nodes/Vertices";
    return header;
  }
  renderNodes() {
    var curNodes = this.props.nodes.slice();
    return curNodes.map(node => {
      var curStyle = { backgroundColor: node.color };
      return (
        <div key={node.id} style={curStyle}>
          {node.name}
        </div>
      );
    });
  }
}

export default NodesDisplay;
