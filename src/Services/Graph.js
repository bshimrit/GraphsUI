const algorithmsList = {
  bfs: {
    description: `Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. 
    It starts at the tree root (or some arbitrary node of a graph), 
    and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.`,
    reverse: false
  },
  dfs: {
    description: `Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. 
     It starts at the tree root (or some arbitrary node of a graph) 
    and explores as far as possible along each branch before backtracking.`,
    reverse: false
  }
};

const colors = {
  0: "#A06B9A",
  1: "#8D9EC6",
  2: "#51D6FF",
  3: "#37FF8B",
  4: "#e2c25d",
  5: "#f9ab13",
  6: "#d0d595",
  7: "#376552"
};

export default class Graph {
  constructor() {
    this.graph = {
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
    };
    // 1: { relations: [2, 3, 4, 12, 11] },
    // 2: { relations: [1, 3, 6] },
    // 3: { relations: [1, 2, 4, 7, 13] },
    // 4: { relations: [1, 3, 6, 10] },
    // 5: { relations: [8, 6, 10] },
    // 6: { relations: [4, 5, 13] },
    // 7: { relations: [3, 8] },
    // 8: { relations: [5, 7, 13] },
    // 9: { relations: [] },
    // 10: { relations: [4, 5, 12] },
    // 11: { relations: [12, 1] },
    // 12: { relations: [10, 11, 15] },
    // 13: { relations: [6, 3, 8, 15] },
    // 14: { relations: [15] },
    // 15: { relations: [14, 13, 12] }

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

  static get getAlgorithmsList() {
    return algorithmsList;
  }

  bfs() {
    var traverseSteps = [];
    var queue = [this.source];
    var distanceMap = { [this.source]: 0 };
    traverseSteps.push({
      id: this.source,
      name: this.graph[this.source].name,
      level: 0,
      color: colors[0]
    });
    while (queue.length) {
      var curVertex = queue.pop();
      var neighbours = this.graph[curVertex].relations;
      for (var i = 0; i < neighbours.length; i++) {
        var vertex = neighbours[i];
        if (distanceMap[vertex] || vertex === this.source) continue;
        else {
          distanceMap[vertex] = distanceMap[curVertex] + 1;
          traverseSteps.push({
            id: vertex,
            name: this.graph[vertex].name,
            level: distanceMap[vertex],
            color: colors[distanceMap[vertex]]
          });
        }
        queue.unshift(vertex);
      }
    }
    return traverseSteps;
  }

  dfs() {
    var traverseSteps = [];
    var traverseMap = {};
    var counter = 0;
    var executeDfs = (source, counter) => {
      var stack = this.graph[source].relations.slice();
      traverseSteps.push({
        id: source,
        level: counter,
        color: colors[counter]
      });

      while (stack.length) {
        var vertex = stack.shift();
        if (traverseMap[vertex]) continue;
        else {
          traverseMap[vertex] = true;
          counter++;
          counter = executeDfs(vertex, counter);
        }
      }

      return counter - 1;
    };

    traverseMap[this.source] = true;
    executeDfs(this.source, counter);
    return traverseSteps;
  }
}
