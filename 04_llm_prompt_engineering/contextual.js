/**
 * Detects cycles in a directed graph using an explicit stack-based DFS.
 * Suitable for browser-based network visualizations.
 * 
 * @param {Object} graph - Adjacency list representation of the graph.
 * @returns {boolean} - True if a cycle is found, false otherwise.
 */
function hasCycle(graph) {
    if (!graph || typeof graph !== 'object') {
      throw new Error("Invalid input: Graph must be an adjacency list object.");
    }
  
    const visited = new Set();
    const inStack = new Set();
  
    for (const startNode in graph) {
      if (visited.has(startNode)) continue;
  
      const stack = [{ node: startNode, index: 0 }];
      const path = [];
  
      while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        const { node, index } = frame;
  
        if (!visited.has(node)) {
          visited.add(node);
          inStack.add(node);
          path.push(node);
        }
  
        const neighbors = graph[node];
        if (!Array.isArray(neighbors)) {
          throw new Error(`Invalid adjacency list at node '${node}': Expected an array.`);
        }
  
        if (index < neighbors.length) {
          const neighbor = neighbors[index];
          if (typeof neighbor !== 'string') {
            throw new Error(`Invalid neighbor '${neighbor}' at node '${node}': Expected string node IDs.`);
          }
  
          // Update frame index for next iteration
          frame.index++;
  
          if (inStack.has(neighbor)) {
            return true; // Cycle detected
          }
  
          if (!visited.has(neighbor)) {
            stack.push({ node: neighbor, index: 0 });
          }
        } else {
          inStack.delete(node);
          path.pop();
          stack.pop();
        }
      }
    }
  
    return false;
  }
  
  // Example usage
  const graph = {
    A: ['B'],
    B: ['C'],
    C: ['A'], // Cycle here
    D: ['E'],
    E: []
  };
  
  try {
    console.log(hasCycle(graph)); // Output: true
  } catch (err) {
    console.error("Graph error:", err.message);
  }
  