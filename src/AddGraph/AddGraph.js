import React, { Component } from "react";

class AddGraph extends Component {
  constructor() {
    super();
    this.state = {
      adjacencyList: {
        1: { name: "A", relations: [2, 3] },
        2: { name: "B", relations: [1, 4, 5] },
        3: { name: "C", relations: [1, 6, 7] },
        4: { name: "D", relations: [2, 8, 9] },
        5: { name: "E", relations: [2, 10] },
        6: { name: "F", relations: [3, 11] },
        7: { name: "G", relations: [3, 12] },
        8: { name: "H", relations: [4] },
        9: { name: "I", relations: [4] },
        10: { name: "J", relations: [5] },
        11: { name: "K", relations: [6] },
        12: { name: "L", relations: [7] }
      }
    };
  }

  renderAdjacencyList() {
    return Object.keys(this.state.adjacencyList).map(key => {
      var curNode = this.state.adjacencyList[key];
      return (
        <div key={key} className="node">
          {curNode.name} -> {this.renderRelations(key, curNode.relations)}
        </div>
      );
    });
  }

  renderRelations(nodeIdx, relations) {
    return relations.map(key => {
      var curNode = this.state.adjacencyList[key];
      return <div key={nodeIdx + "-" + key}>{curNode.name}</div>;
    });
  }

  render() {
    return <div>{this.renderAdjacencyList()}</div>;
  }
}

export default AddGraph;
