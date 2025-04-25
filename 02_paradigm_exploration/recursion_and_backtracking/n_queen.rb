class NQueens
    attr_reader :solutions
  
    def initialize(n)
      @n = n
      @solutions = []
    end
  
    def solve
      place_queens([])
    end
  
    def place_queens(queens)
      row = queens.length
      if row == @n
        @solutions << queens.dup
        return
      end
      (0...@n).each do |col|
        if safe?(queens, row, col)
          queens << col
          place_queens(queens)
          queens.pop
        end
      end
    end
  
    def safe?(queens, row, col)
      queens.each_with_index do |c, r|
        return false if c == col || (r - row).abs == (c - col).abs
      end
      true
    end
  
    def print_board(solution)
      solution.each do |col|
        puts (0...@n).map { |i| i == col ? "Q" : "." }.join(" ")
      end
    end
  end
  
  if __FILE__ == $0
    n = 8
    start = Time.now
    solver = NQueens.new(n)
    solver.solve
    duration = Time.now - start
  
    puts "Total solutions: #{solver.solutions.length}"
    puts "First solution:"
    solver.print_board(solver.solutions.first)
    puts "Execution time: #{(duration * 1000).round(3)} ms"
  end
  