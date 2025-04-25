object NQueensApp {
  def solve(n: Int): List[List[Int]] = {
    def isSafe(col: Int, queens: List[Int], row: Int): Boolean =
      queens.zipWithIndex.forall {
        case (c, r) => c != col && math.abs(c - col) != row - r
      }

    def placeQueens(row: Int): List[List[Int]] = {
      if (row == n) List(Nil)
      else
        for {
          queens <- placeQueens(row + 1)
          col <- 0 until n
          if isSafe(col, queens, row)
        } yield col :: queens
    }

    placeQueens(0).map(_.reverse)
  }

  def printBoard(solution: List[Int]): Unit = {
    val n = solution.length
    solution.foreach { col =>
      println((0 until n).map(i => if (i == col) "Q" else ".").mkString(" "))
    }
  }

  def main(args: Array[String]): Unit = {
    val n = 8
    val start = System.nanoTime()
    val solutions = solve(n)
    val end = System.nanoTime()

    println(s"Total solutions: ${solutions.length}")
    println("First solution:")
    printBoard(solutions.head)
    println(f"Execution time: ${(end - start) / 1e6}%.3f ms")
  }
}
