import Graph from "./Graph.js";

var graphObj = new Graph();

function convertGraphToProp() {
  var nodes = [];
  var edges = [];
  var graph = graphObj.getGraph;

  for (var vertex in graph) {
    nodes.push({
      id: parseInt(vertex),
      label: vertex,
      color: { background: "#ffffff" }
    });
    for (let i = 0; i < graph[vertex].relations.length; i++) {
      var edge = { from: parseInt(vertex), to: graph[vertex].relations[i] };
      edges.push(edge);
    }
  }
  return { nodes, edges };
}

function traverse(logic, selectedNode) {
  graphObj.setSource = selectedNode;
  switch (logic) {
    case "bfs":
      return graphObj.bfs();
    case "dfs":
      return graphObj.dfs();
    default:
      return [];
  }
}

function getAlgorithmsList() {
  return Graph.getAlgorithmsList;
}

export default {
  convertGraphToProp,
  traverse,
  getAlgorithmsList
};
