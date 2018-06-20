import React, { Component } from "react";

import Graph from "react-graph-vis";

import GraphService from "./GraphService";

class GraphComp extends Component {
  constructor() {
    super();
    this.state = {
      graph: GraphService.convertGraphToProp(),
      options: {
        layout: { improvedLayout: true },
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

  startTraverse = algo => {
    var nodeSteps = GraphService.traverse(algo);
    nodeSteps.forEach((node, idx) => {
      updateSelected(this, node, idx);
    });

    function updateSelected(cmp, node, idx) {
      setTimeout(function() {
        var curGraph = JSON.parse(JSON.stringify(cmp.state.graph));
        curGraph.nodes[node - 1].color.background = "red";
        cmp.setState({ graph: curGraph });
      }, 1000 * idx);
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.startTraverse("bfs");
          }}
        >
          Traverse BFS
        </button>
        <button
          onClick={() => {
            this.startTraverse("dfs");
          }}
        >
          Traverse DFS
        </button>
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
