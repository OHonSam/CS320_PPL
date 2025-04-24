/**
 * Detects cycles in a directed graph using DFS and a stack.
 * @param {Object} graph - The adjacency list of the graph.
 * @returns {boolean} - True if a cycle is found, otherwise false.
 */
function hasCycle(graph) {
    const visited = new Set();         // Tracks all visited nodes
    const recursionStack = new Set();  // Tracks nodes in the current DFS path
  
    /**
     * Performs DFS from the given node.
     * @param {string} node - Current node in DFS.
     * @returns {boolean} - True if a cycle is found from this node.
     */
    function dfs(node) {
      if (recursionStack.has(node)) return true;   // Found a cycle
      if (visited.has(node)) return false;         // Already explored safely
  
      visited.add(node);
      recursionStack.add(node);
  
      // Explore all neighbors
      for (const neighbor of graph[node] || []) {
        if (dfs(neighbor)) return true;
      }
  
      recursionStack.delete(node);  // Backtrack
      return false;
    }
  
    // Check for cycles starting from each unvisited node
    for (const node in graph) {
      if (dfs(node)) return true;
    }
  
    return false;
  }
  
  // Example usage
  const graph = {
    A: ['B'],
    B: ['C'],
    C: ['A'], // Cycle: A → B → C → A
    D: ['E'],
    E: []
  };
  
  console.log(hasCycle(graph)); // Output: true
  