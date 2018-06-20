import React, { Component } from "react";

import Graph from "react-graph-vis";

import GraphService from "./graphService";

class GraphComp extends Component {
  constructor() {
    super();
    this.state = {
      graph: GraphService.convertGraphToProp(),
      options: {
        nodes: { color: { highlight: { background: "#b52222" } } },
        edges: {
          arrows: { to: { enabled: false }, from: { enabled: false } }
        }
      },
      events: {
        select: function(event) {
          var { nodes, edges } = event;
        }
      }
    };
  }

  startTraverse() {
    this.setState({ graph: { nodes: GraphService.traverse('bfs')}});
  }

  render() {
    return (
      <div>
        <button>Start</button>
        <Graph
          graph={this.state.graph}
          options={this.state.options}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default GraphComp;
