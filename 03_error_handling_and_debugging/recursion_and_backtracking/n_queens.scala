object NQueensProblem {
  def isSafe(board: Array[Int], row: Int, col: Int): Boolean = {
    for (i <- 0 until row) {
      // Check if queens in previous rows attack this position
      // board(i) is the column of queen in row i
      if (board(i) == col || // Same column
          board(i) - i == col - row || // Same diagonal \
          board(i) + i == col + row) { // Same diagonal /
        return false
      }
    }
    true
  }
  
  def solveNQueensUtil(board: Array[Int], row: Int, solutions: scala.collection.mutable.ListBuffer[Array[Int]]): Unit = {
    val n = board.length
    if (row == n) {
      // We found a solution, make a copy of the board and add to solutions
      solutions += board.clone()
      return
    }
    
    for (col <- 0 until n) {
      if (isSafe(board, row, col)) {
        board(row) = col // Place queen
        
        // Recur to place rest of the queens
        solveNQueensUtil(board, row + 1, solutions)
        
        // Backtrack
        board(row) = -1
      }
    }
  }
  
  def solveNQueens(n: Int): List[Array[Int]] = {
    // board(i) represents the column where the queen is placed in row i
    val board = Array.fill(n)(-1) // Initialize with -1 (no queen placed)
    val solutions = scala.collection.mutable.ListBuffer[Array[Int]]()
    
    solveNQueensUtil(board, 0, solutions)
    solutions.toList
  }
  
  // Print the chessboard with queens placed
  def printBoard(board: Array[Int]): Unit = {
    val n = board.length
    for (i <- 0 until n) {
      for (j <- 0 until n) {
        if (board(i) == j) {
          print("Q ")
        } else {
          print(". ")
        }
      }
      println()
    }
    println()
  }
  
  def main(args: Array[String]): Unit = {
    val n = 8 // Default value, can be changed
    
    val startTime = System.nanoTime()
    val solutions = solveNQueens(n)
    val duration = (System.nanoTime() - startTime) / 1e9 // Convert to seconds
    
    println(s"Found ${solutions.length} solutions for $n-Queens problem")
    println(f"Time taken: $duration%.6f seconds\n")
    
    // Print first solution as an example
    if (solutions.nonEmpty) {
      println("First solution:")
      printBoard(solutions.head)
    }
  }
}