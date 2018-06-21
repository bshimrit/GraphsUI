import React, { Component } from "react";

import Graph from "react-graph-vis";

class GraphComp extends Component {
  render() {
    return (
      <div className="Graph">
        <Graph
          graph={this.props.graph}
          options={this.props.options}
          events={this.props.events}
        />
      </div>
    );
  }
}

export default GraphComp;
