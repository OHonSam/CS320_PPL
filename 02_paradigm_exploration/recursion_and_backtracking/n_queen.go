package main

import (
	"fmt"
	"time"
)

var solutions [][]int

func isSafe(queens []int, row, col int) bool {
	for r := 0; r < row; r++ {
		c := queens[r]
		if c == col || abs(c-col) == abs(r-row) {
			return false
		}
	}
	return true
}

func solveNQueens(n int, row int, queens []int) {
	if row == n {
		solution := make([]int, n)
		copy(solution, queens)
		solutions = append(solutions, solution)
		return
	}
	for col := 0; col < n; col++ {
		if isSafe(queens, row, col) {
			queens[row] = col
			solveNQueens(n, row+1, queens)
		}
	}
}

func printBoard(queens []int) {
	n := len(queens)
	for _, q := range queens {
		for c := 0; c < n; c++ {
			if c == q {
				fmt.Print("Q ")
			} else {
				fmt.Print(". ")
			}
		}
		fmt.Println()
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	n := 8
	queens := make([]int, n)
	start := time.Now()
	solveNQueens(n, 0, queens)
	elapsed := time.Since(start)

	fmt.Printf("Total solutions: %d\n", len(solutions))
	fmt.Println("First solution:")
	printBoard(solutions[0])
	fmt.Printf("Execution time: %s\n", elapsed)
}
