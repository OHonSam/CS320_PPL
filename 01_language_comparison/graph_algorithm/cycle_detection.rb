class Graph
    attr_accessor :vertices, :adjacency_list
    
    def initialize(vertices)
      @vertices = vertices
      @adjacency_list = Array.new(vertices) { [] }
    end
    
    def add_edge(source, destination)
      @adjacency_list[source].push(destination)
    end
    
    def has_cycle?
      visited = Array.new(@vertices, false)
      rec_stack = Array.new(@vertices, false)
      
      @vertices.times do |i|
        if !visited[i]
          if cycle_util(i, visited, rec_stack)
            return true
          end
        end
      end
      
      return false
    end
    
    private
    
    def cycle_util(vertex, visited, rec_stack)
      visited[vertex] = true
      rec_stack[vertex] = true
      
      @adjacency_list[vertex].each do |neighbor|
        if !visited[neighbor]
          if cycle_util(neighbor, visited, rec_stack)
            return true
          end
        elsif rec_stack[neighbor]
          return true
        end
      end
      
      rec_stack[vertex] = false
      return false
    end
  end
  
  # Example usage
  def run_cycle_detection
    start_time = Time.now
    
    # Create a graph with 4 vertices
    g = Graph.new(4)
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 2)
    g.add_edge(2, 0)
    g.add_edge(2, 3)
    g.add_edge(3, 3)
    
    if g.has_cycle?
      puts "Graph contains cycle"
    else
      puts "Graph doesn't contain cycle"
    end
    
    end_time = Time.now
    puts "Execution time: #{(end_time - start_time) * 1000} ms"
  end
  
  run_cycle_detection