import React, { Component } from "react";

import Graph from "./Graph/GraphComp";
import ControlPanel from "./ControlPanel/ControlPanel";
import NodesDisplay from "./NodesDisplay/NodesDisplay";
import AddGraph from "./AddGraph/AddGraph";
import Modal from "./Modal/Modal";

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
        layout: {
          improvedLayout: true
        },
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
      curNodes: [],
      reverse: false,
      algorithmsList: GraphService.getAlgorithmsList(),
      interval: null,
      addGraph: false
    };
  }

  updateSelectedNode(node) {
    this.setState({ selectedNode: node });
  }

  startTraverse = algo => {
    var origGraph = JSON.parse(JSON.stringify(this.state.origGraph));
    var reverse = this.state.algorithmsList[algo].reverse;
    this.setState({ graph: origGraph, curNodes: [], reverse });
    var nodeSteps = GraphService.traverse(algo, this.state.selectedNode);
    this.updateNodes(nodeSteps, 1000);
  };

  updateNodes = (array, delay) => {
    var i = 0;
    var curInterval = this.state.interval;
    clearInterval(curInterval);
    curInterval = setInterval(() => {
      var node = array[i];
      var curGraph = JSON.parse(JSON.stringify(this.state.graph));
      curGraph.nodes[node.id - 1].color.background = node.color;
      var newNodes = this.state.curNodes.slice();
      newNodes.push(node);
      this.setState({ graph: curGraph, curNodes: newNodes });
      if (i++ >= array.length - 1) clearInterval(curInterval);
    }, delay);
    this.setState({ interval: curInterval });
  };

  toggleModal = () => {
    this.setState({
      addGraph: !this.state.addGraph
    });
  };

  render() {
    return (
      <div>
        <h1>Choose a starting node and traversing algorithm</h1>
        <div className="main">
          <button onClick={this.toggleModal}>Update Graph</button>
          <ControlPanel
            startAction={this.startTraverse}
            controlList={this.state.algorithmsList}
          />
          <div className="graph-container">
            <Graph
              graph={this.state.graph}
              options={this.state.options}
              events={this.state.events}
            />
            <NodesDisplay
              nodes={this.state.curNodes}
              reverse={this.state.reverse}
            />
          </div>
        </div>
        <Modal show={this.state.addGraph} handleCancel={this.toggleModal}>
          <AddGraph />
        </Modal>
      </div>
    );
  }
}

export default Main;
