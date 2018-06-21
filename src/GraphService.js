var graph = {
  1: { relations: [2, 3, 4, 12, 11] },
  2: { relations: [1, 3, 6] },
  3: { relations: [1, 2, 4, 7, 13] },
  4: { relations: [1, 3, 6, 10] },
  5: { relations: [8, 6, 10] },
  6: { relations: [4, 5, 13] },
  7: { relations: [3, 8] },
  8: { relations: [5, 7, 13] },
  9: { relations: [] },
  10: { relations: [4, 5, 12] },
  11: { relations: [12, 1] },
  12: { relations: [10, 11, 15] },
  13: { relations: [6, 3, 8, 15] },
  14: { relations: [15] },
  15: { relations: [14, 13, 12] }
};

var traverseSteps = [];

function convertGraphToProp() {
  var nodes = [];
  var edges = [];

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
  traverseSteps = [];
  switch (logic) {
    case "bfs":
      bfs(graph, selectedNode);
      break;
    case "dfs":
      dfs(graph, selectedNode);
      break;
    default:
      throw "Problem";
  }

  return traverseSteps;
}

function bfs(graph, source) {
  var queue = [source];
  var counter = 0;
  var distanceMap = { [source]: 0 };
  while (queue.length) {
    var curVertex = queue.pop();
    traverseSteps.push(curVertex);
    var neighbours = graph[curVertex].relations;
    for (var i = 0; i < neighbours.length; i++) {
      var vertex = neighbours[i];
      if (distanceMap[vertex] || vertex === source) continue;
      else {
        distanceMap[vertex] = distanceMap[curVertex] + 1;
      }
      queue.unshift(vertex);
    }
  }
  return distanceMap;
}

function dfs(graph, source) {
  var traverseMap = {};
  traverseMap[source] = true;
  executeDfs(source);

  function executeDfs(source) {
    var stack = graph[source].relations.slice();
    traverseSteps.push(source);

    while (stack.length) {
      var vertex = stack.shift();
      if (traverseMap[vertex]) continue;
      else {
        traverseMap[vertex] = true;
        executeDfs(vertex);
      }
    }
  }
  return traverseMap;
}

export default {
  convertGraphToProp,
  traverse
};
