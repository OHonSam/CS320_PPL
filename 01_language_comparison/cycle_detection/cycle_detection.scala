import scala.annotation.tailrec
import scala.collection.mutable

object CycleDetection {
  // Graph represented as an adjacency list
  type Graph = Map[Int, List[Int]]
  
  // Detect cycle in a directed graph using functional approach
  def hasCycle(graph: Graph): Boolean = {
    // Get all vertices
    val vertices = graph.keys.toSet ++ graph.values.flatten.toSet
    
    @tailrec
    def dfs(remaining: Set[Int], visited: Set[Int], recStack: Set[Int]): Boolean = {
      if (remaining.isEmpty) false
      else {
        val vertex = remaining.head
        
        def explore(v: Int, vis: Set[Int], recS: Set[Int]): (Boolean, Set[Int]) = {
          if (recS.contains(v)) (true, vis)
          else if (vis.contains(v)) (false, vis)
          else {
            val newVis = vis + v
            val newRecS = recS + v
            
            val neighbors = graph.getOrElse(v, List.empty[Int])
            
            neighbors.foldLeft((false, newVis)) { case ((cycleFound, currentVis), neighbor) =>
              if (cycleFound) (true, currentVis)
              else explore(neighbor, currentVis, newRecS)
            }
          }
        }
        
        val (hasCycleFromVertex, newVisited) = 
          if (visited.contains(vertex)) (false, visited)
          else explore(vertex, visited, Set.empty[Int])
        
        if (hasCycleFromVertex) true
        else dfs(remaining - vertex, newVisited, Set.empty[Int])
      }
    }
    
    dfs(vertices, Set.empty[Int], Set.empty[Int])
  }
  
  def main(args: Array[String]): Unit = {
    val startTime = System.currentTimeMillis()
    
    // Create a graph as a Map of vertex -> List of adjacent vertices
    val graph: Graph = Map(
      0 -> List(1, 2),
      1 -> List(2),
      2 -> List(0, 3),
      3 -> List(3)
    )
    
    val result = if (hasCycle(graph)) "Graph contains cycle" else "Graph doesn't contain cycle"
    println(result)
    
    val endTime = System.currentTimeMillis()
    println(s"Execution time: ${endTime - startTime} ms")
  }
}