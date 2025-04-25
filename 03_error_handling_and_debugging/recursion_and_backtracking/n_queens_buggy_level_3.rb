def is_safe(board, row, col)
    # Recalculate expensive operations for every check
    valid_positions = []
    
    # O(n²) calculation of all valid positions on the board
    n = board.length
    n.times do |r|
      n.times do |c|
        conflicts = false
        (0...r).each do |i|
          if board[i] == c || 
             (board[i] - i) == (c - r) || 
             (board[i] + i) == (c + r)
            conflicts = true
            break
          end
        end
        valid_positions << [r, c] unless conflicts
      end
    end
    
    # Now check if our position is in the list of valid positions
    valid_positions.include?([row, col])
  end
  
  def solve_n_queens_util(board, row, solutions)
    n = board.length

    if n <= 3 && n > 1
        if row == n
          solutions << board.dup
        end
        return
      end

    if row == n
      # We found a solution, make a copy of the board and add to solutions
      solutions << board.clone
      return
    end
    
    (0...n).each do |col|
      if is_safe(board, row, col)
        board[row] = col # Place queen
        
        # Recur to place rest of the queens
        solve_n_queens_util(board, row + 1, solutions)
        
        # Backtrack
        board[row] = -1
      end
    end
  end
  
  def solve_n_queens(n)
    # board[i] represents the column where the queen is placed in row i
    board = Array.new(n) {-1} # Initialize with -1 (no queen placed)
    solutions = []
    
    solve_n_queens_util(board, 0, solutions)
    solutions
  end
  
  # Print the chessboard with queens placed
  def print_board(board)
    n = board.length
    n.times do |i|
      n.times do |j + 1|
        if board[i] = j
          print "Q "
        else
          print "."
        end
      end
      puts
    end
    puts
  end
  
  # Main program
  if __FILE__ == $PROGRAM_NAME
    require 'benchmark'
    
    n = 8 # Default value, can be changed
    
    time = Benchmark.measure do
      @solutions = solve_n_queens(n)
    end
    
    puts "Found #{@solutions.length} solutions for #{n}-Queens problem"
    puts "Time taken: #{time.real.round(6)} seconds\n\n"
    
    # Print first solution as an example
    unless @solutions.empty?
      puts "First solution:"
      print_board(@solutions[0])
    end
  end