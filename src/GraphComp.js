import React, { Component } from "react";

import Graph from "react-graph-vis";

import GraphService from "./GraphService";

class GraphComp extends Component {
  constructor() {
    super();
    this.interval;
    this.state = {
      graph: GraphService.convertGraphToProp(),
      origGraph: GraphService.convertGraphToProp(),
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
      },
      selectedNode: 1
    };
  }

  startTraverse = algo => {
    var origGraph = JSON.parse(JSON.stringify(this.state.origGraph));
    this.setState({ graph: origGraph });
    var nodeSteps = GraphService.traverse(algo, this.state.selectedNode);
    this.updateSelectedNodes(this, nodeSteps, 1000);
  };

  updateSelectedNodes(cmp, array, delay) {
    var i = 0;
    clearInterval(cmp.interval);
    cmp.interval = setInterval(function() {
      var node = array[i];
      var curGraph = JSON.parse(JSON.stringify(cmp.state.graph));
      curGraph.nodes[node - 1].color.background = "red";
      cmp.setState({ graph: curGraph });

      if (i++ >= array.length - 1) clearInterval(cmp.interval);
    }, delay);
  }

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
