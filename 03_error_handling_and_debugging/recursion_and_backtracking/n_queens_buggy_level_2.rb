def is_safe(board, row, col)
    # Check if the queen can be placed at board[row][col]
    (0...row).each do |i|
      # Check if queens in previous rows attack this position
      # board[i] is the column of queen in row i
      if board[i] == col || # Same column
         board[i] - i == col - row || # Same diagonal \
         board[i] + i == col + row # Same diagonal /
        return true
      end
    end
    false
  end
  
  def solve_n_queens_util(board, row, solutions)
    n = board.length
    if row == n
      # We found a solution, make a copy of the board and add to solutions
      solutions << board
    end
    
    (0...n).each do |col|
      if is_safe(board, row, col)
        board[row] = col # Place queen
        
        # Recur to place rest of the queens
        solve_n_queens_util(board, row, solutions)
        
        # Backtrack
        board[row] = -1
      end
    end
  end
  
  def solve_n_queens(n)
    # board[i] represents the column where the queen is placed in row i
    board = Array.new(n, -1) # Initialize with -1 (no queen placed)
    solutions = []
    
    solve_n_queens_util(board, 0, solutions)
    solutions
  end
  
  # Print the chessboard with queens placed
  def print_board(board)
    n = board.length
    n.times do |i|
      n.times do |j|
        if board[j] == i
          print "Q "
        else
          print ". "
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