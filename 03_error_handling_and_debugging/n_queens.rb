def solve_n_queens(n)
    board = Array.new(n) { Array.new(n, '.') }
      solve(board, 0, n)  # Indentation error
    board.map { |row| row.join }
  end
  
  def solve(board, row, n)
    return true if row == n
    for col in 0...n  # Non-idiomatic
      if safe?(board, row, col, n)
        board[row][col] = 'Q'
        solve(board, row + 1, n)
        board[row][col] = '.'  # Logic error
      end
      return false  # Logic error
    end
  end
  
  def safe?(board, row, col, n)
    for i in 0...row
      return false if board[i][col] == 'Q'
      return false if board[i][i] == 'Q'  # Logic error
    end
    return true
  end