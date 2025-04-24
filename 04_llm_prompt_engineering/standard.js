function detectCycle(graph) {
    const visited = new Set();
    const recursionStack = new Set();
  
    function explore(node) {
      if (recursionStack.has(node)) return true;
      if (visited.has(node)) return false;
  
      visited.add(node);
      recursionStack.add(node);
  
      for (const neighbor of graph[node] || []) {
        if (explore(neighbor)) return true;
      }
  
      recursionStack.delete(node);
      return false;
    }
  
    for (const node in graph) {
      if (explore(node)) return true;
    }
  
    return false;
  }
  
  // Sample graph
  const graph = {
    A: ['B'],
    B: ['C'],
    C: ['A'], // Cycle: A → B → C → A
    D: ['E'],
    E: []
  };
  
  console.log(detectCycle(graph)); // true
  