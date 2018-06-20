var graph = {
  1: { relations: [2, 3, 4, 12, 11], visited: false },
  2: { relations: [1, 3, 6], visited: false },
  3: { relations: [1, 2, 4, 7, 13], visited: false },
  4: { relations: [1, 3, 6, 10], visited: false },
  5: { relations: [8, 6, 10], visited: false },
  6: { relations: [4, 5, 13], visited: false },
  7: { relations: [3, 8], visited: false },
  8: { relations: [5, 7, 13], visited: false },
  9: { relations: [14], visited: false },
  10: { relations: [4, 5, 12], visited: false },
  11: { relations: [12, 1], visited: false },
  12: { relations: [10, 11, 15], visited: false },
  13: { relations: [6, 3, 8, 15], visited: false },
  14: { relations: [9, 15], visited: false },
  15: { relations: [14, 13, 12], visited: false }
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

function traverse(logic) {
  traverseSteps = [];
  switch (logic) {
    case "bfs":
      bfs(graph, 4);
      break;
    case "dfs":
      dfs(graph, 4);
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
  traverseSteps.push(source);
  var stack = graph[source].relations;

  while (stack.length) {
    var vertex = stack.shift();
    if (graph[vertex].visited) continue;
    else graph[vertex].visited = true;
    dfs(graph, vertex);
  }

  return graph;
}

export default {
  convertGraphToProp,
  traverse
};
