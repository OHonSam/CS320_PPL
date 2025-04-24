/**
 * Class representing a directed graph with cycle detection.
 * Uses an explicit stack-based DFS to avoid recursion depth issues.
 */
class DirectedGraph {
    constructor() {
      this.adjacencyList = {};
    }
  
    // Add a node to the graph
    addNode(node) {
      if (!this.adjacencyList[node]) {
        this.adjacencyList[node] = [];
      }
    }
  
    // Add a directed edge from source to target
    addEdge(source, target) {
      this.addNode(source);
      this.addNode(target);
      this.adjacencyList[source].push(target);
    }
  
    // Detect if the graph contains a cycle
    hasCycle() {
      const visited = new Set();
      const inStack = new Set();
  
      for (const node of Object.keys(this.adjacencyList)) {
        if (visited.has(node)) continue;
  
        const stack = [{ node, index: 0 }];
        const path = [];
  
        while (stack.length > 0) {
          const frame = stack[stack.length - 1];
          const { node: current, index } = frame;
  
          if (!visited.has(current)) {
            visited.add(current);
            inStack.add(current);
            path.push(current);
          }
  
          const neighbors = this.adjacencyList[current];
  
          if (index < neighbors.length) {
            const neighbor = neighbors[index];
            frame.index++;
  
            if (inStack.has(neighbor)) {
              return true; // Cycle detected
            }
  
            if (!visited.has(neighbor)) {
              stack.push({ node: neighbor, index: 0 });
            }
          } else {
            inStack.delete(current);
            path.pop();
            stack.pop();
          }
        }
      }
  
      return false;
    }
  }
  
  // Example usage:
  const graph = new DirectedGraph();
  graph.addEdge('A', 'B');
  graph.addEdge('B', 'C');
  graph.addEdge('C', 'A'); // Cycle: A → B → C → A
  graph.addEdge('D', 'E');
  
  console.log(graph.hasCycle()); // true
  