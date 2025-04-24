package main

import (
    "fmt"
    "time"
)

func isSafe(board []int, row, col int) bool {
    // Check if the queen can be placed at board[row][col]
    for i := 0; i < row; i++ {
        // Check if queens in previous rows attack this position
        // board[i] is the column of queen in row i
        if board[i] == col || // Same column
           board[i]-i == col-row || // Same diagonal \
           board[i]+i == col+row { // Same diagonal /
            return false
        }
    }
    return true
}

func solveNQueens(n int) [][]int {
    // board[i] represents the column where the queen is placed in row i
    board := make([]int, n)
    for i := range board {
        board[i] = -1 // Initialize with -1 (no queen placed)
    }
    
    solutions := [][]int{}
    solveNQueensUtil(board, 0, &solutions)
    return solutions
}

func solveNQueensUtil(board []int, row int, solutions *[][]int) {
    n := len(board)
    if row == n {
        // We found a solution, make a copy of the board and add to solutions
        solution := make([]int, n)
        copy(solution, board)
        *solutions = append(*solutions, solution)
        return
    }
    
    for col := 0; col < n; col++ {
        if isSafe(board, row, col) {
            board[row] = col // Place queen
            
            // Recur to place rest of the queens
            solveNQueensUtil(board, row+1, solutions)
            
            // Backtrack
            board[row] = -1
        }
    }
}

// Print the chessboard with queens placed
func printBoard(board []int) {
    n := len(board)
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if board[i] == j {
                fmt.Print("Q ")
            } else {
                fmt.Print(". ")
            }
        }
        fmt.Println()
    }
    fmt.Println()
}

func main() {
    n := 8 // Default value, can be changed
    
    start := time.Now()
    solutions := solveNQueens(n)
    duration := time.Since(start)
    
    fmt.Printf("Found %d solutions for %d-Queens problem\n", len(solutions), n)
    fmt.Printf("Time taken: %v\n\n", duration)
    
    // Print first solution as an example
    if len(solutions) > 0 {
        fmt.Println("First solution:")
        printBoard(solutions[0])
    }
}