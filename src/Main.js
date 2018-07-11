import React, { Component } from "react";

import Graph from "./Graph/GraphComp";
import ControlPanel from "./ControlPanel/ControlPanel";
import NodesDisplay from "./NodesDisplay/NodesDisplay";

import GraphService from "./Services/GraphService";

class Main extends Component {
  constructor() {
    super();
    const updateSelected = this.updateSelectedNode.bind(this);
    this.state = {
      graph: GraphService.convertGraphToProp(),
      origGraph: GraphService.convertGraphToProp(),
      options: {
        nodes: { font: { face: "Montserrat", size: 20 } },
        layout: { improvedLayout: true },
        edges: {
          length: 200,
          arrows: {
            to: { enabled: false },
            from: { enabled: false }
          }
        }
      },
      events: {
        select: function(event) {
          updateSelected(event.nodes[0]);
        }
      },
      selectedNode: 1,
      curNodes: []
    };
    this.algorithmsList = GraphService.getAlgorithmsList();
    this.interval;
  }

  updateSelectedNode(node) {
    this.setState({ selectedNode: node });
  }

  startTraverse = algo => {
    var origGraph = JSON.parse(JSON.stringify(this.state.origGraph));
    this.setState({ graph: origGraph, curNodes: [] });
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
      var newNodes = this.state.curNodes.slice();
      newNodes.push(node);
      this.setState({ graph: curGraph, curNodes: newNodes });
      if (i++ >= array.length - 1) clearInterval(this.interval);
    }, delay);
  };

  render() {
    return (
      <div>
        <h1>Choose a starting node and traversing algorithm</h1>
        <div className="main">
          <ControlPanel
            startAction={this.startTraverse}
            controlList={this.algorithmsList}
          />
          <div className="graph-container">
            <Graph
              graph={this.state.graph}
              options={this.state.options}
              events={this.state.events}
            />
            <NodesDisplay nodes={this.state.curNodes} reverse={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
