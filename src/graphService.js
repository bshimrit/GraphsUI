var graph = {
  1: { relations: [2, 3, 4], visited: false },
  2: { relations: [1, 3, 5], visited: false },
  3: { relations: [1, 2, 4], visited: false },
  4: { relations: [1, 3, 6], visited: false },
  5: { relations: [2, 8, 6], visited: false },
  6: { relations: [4, 5], visited: false },
  7: { relations: [3, 8], visited: false },
  8: { relations: [5, 7], visited: false },
  9: { relations: [], visited: false }
};

function convertGraphToProp() {
  var nodes = [];
  var edges = [];

  for (var vertex in graph) {
    nodes.push({ id: vertex, label: vertex });
    for (let i = 0; i < graph[vertex].relations.length; i++) {
      var edge = { from: parseInt(vertex), to: graph[vertex].relations[i] };
      edges.push(edge);
    }
  }

  return { nodes, edges };
}

function traverseBfs() {

}

function bfs(graph, source) {
  var queue = [source];
  var counter = 0;
  var distanceMap = { [source]: 0 };

  while (queue.length) {
    var curVertex = queue.pop();
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
  traverseBfs
};
