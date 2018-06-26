export default class Graph {
  constructor() {
    this.graph = {
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

    this.source = 1;
  }

  get getGraph() {
    return this.graph;
  }

  set setGraph(value) {
    this.graph = value;
  }

  get getSource() {
    return this.source;
  }

  set setSource(newSource) {
    this.source = newSource;
  }

  bfs() {
    var traverseSteps = [];
    var queue = [this.source];
    var distanceMap = { [this.source]: 0 };
    while (queue.length) {
      var curVertex = queue.pop();
      traverseSteps.push(curVertex);
      var neighbours = this.graph[curVertex].relations;
      for (var i = 0; i < neighbours.length; i++) {
        var vertex = neighbours[i];
        if (distanceMap[vertex] || vertex === this.source) continue;
        else {
          distanceMap[vertex] = distanceMap[curVertex] + 1;
        }
        queue.unshift(vertex);
      }
    }
    return traverseSteps;
  }

  dfs() {
    var traverseSteps = [];
    var traverseMap = {};
    var executeDfs = source => {
      var stack = this.graph[source].relations.slice();
      traverseSteps.push(source);

      while (stack.length) {
        var vertex = stack.shift();
        if (traverseMap[vertex]) continue;
        else {
          traverseMap[vertex] = true;
          executeDfs(vertex);
        }
      }
    };

    traverseMap[this.source] = true;
    executeDfs(this.source);
    console.log(this);
    return traverseSteps;
  }
}
