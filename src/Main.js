import React, { Component } from "react";

import Graph from "./GraphComp";
import ControlPanel from "./ControlPanel";

import GraphService from "./GraphService";

class Main extends Component {
  constructor() {
    super();
    const updateSelected = this.updateSelectedNode.bind(this);
    this.interval;
    this.state = {
      graph: GraphService.convertGraphToProp(),
      origGraph: GraphService.convertGraphToProp(),
      options: {
        nodes: { font: { face: "Montserrat" } },
        layout: { improvedLayout: true },
        edges: {
          arrows: { to: { enabled: false }, from: { enabled: false } }
        }
      },
      events: {
        select: function(event) {
          updateSelected(event.nodes[0]);
          var { nodes, edges } = event;
        }
      },
      selectedNode: 1
    };
  }

  updateSelectedNode(node) {
    this.state.selectedNode = node;
  }

  startTraverse = algo => {
    var origGraph = JSON.parse(JSON.stringify(this.state.origGraph));
    this.setState({ graph: origGraph });
    var nodeSteps = GraphService.traverse(algo, this.state.selectedNode);
    this.updateNodes(nodeSteps, 1000);
  };

  updateNodes = (array, delay) => {
    var i = 0;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      var node = array[i];
      var curGraph = JSON.parse(JSON.stringify(this.state.graph));
      curGraph.nodes[node - 1].color.background = "#4291b7";
      this.setState({ graph: curGraph });

      if (i++ >= array.length - 1) clearInterval(this.interval);
    }, delay);
  };

  render() {
    return (
      <div className="Main">
        <ControlPanel startTraverse={this.startTraverse} />
        <Graph
          graph={this.state.graph}
          options={this.state.options}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default Main;
