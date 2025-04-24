class DirectedGraph {
    constructor(adjacencyList = {}) {
      if (!this._isValidGraph(adjacencyList)) {
        throw new Error("Graph must be a non-null object with array values.");
      }
      this.graph = adjacencyList;
    }
  
    // Internal validation of the graph structure
    _isValidGraph(graph) {
      if (typeof graph !== 'object' || graph === null || Array.isArray(graph)) return false;
      return Object.values(graph).every(neighbors => Array.isArray(neighbors));
    }
  
    // Main method to detect cycle using non-recursive DFS
    hasCycle() {
      const visited = new Set();
      const inStack = new Set();
  
      for (const node of Object.keys(this.graph)) {
        if (visited.has(node)) continue;
  
        const stack = [{ node, index: 0 }];
        visited.add(node);
        inStack.add(node);
  
        while (stack.length > 0) {
          const frame = stack[stack.length - 1];
          const { node: current, index } = frame;
  
          const neighbors = this.graph[current];
  
          if (index < neighbors.length) {
            const neighbor = neighbors[index];
            frame.index++;
  
            if (typeof neighbor !== 'string') {
              throw new Error(`Invalid neighbor '${neighbor}' at node '${current}': Expected string.`);
            }
  
            if (inStack.has(neighbor)) return true;
  
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              inStack.add(neighbor);
              stack.push({ node: neighbor, index: 0 });
            }
          } else {
            inStack.delete(current);
            stack.pop();
          }
        }
      }
  
      return false;
    }
  }
  
  // Test Examples:
  
  // 1. Empty Graph
  console.log(new DirectedGraph({}).hasCycle()); // false
  
  // 2. Single-node, no edges
  console.log(new DirectedGraph({ A: [] }).hasCycle()); // false
  
  // 3. Single-node with self-loop
  console.log(new DirectedGraph({ A: ['A'] }).hasCycle()); // true
  
  // 4. Disconnected graph with one cycle
  const graphWithCycle = {
    A: ['B'],
    B: ['C'],
    C: ['A'], // cycle
    D: [],
    E: ['F'],
    F: []
  };
  console.log(new DirectedGraph(graphWithCycle).hasCycle()); // true
  
  // 5. Valid graph, no cycle
  const acyclicGraph = {
    A: ['B'],
    B: ['C'],
    C: [],
    D: ['E'],
    E: []
  };
  console.log(new DirectedGraph(acyclicGraph).hasCycle()); // false
  