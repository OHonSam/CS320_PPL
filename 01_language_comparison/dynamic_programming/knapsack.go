package main

import (
	"fmt"
	"time"
)

// KnapsackSolution holds the solution data
type KnapsackSolution struct {
	MaxValue     int
	SelectedItems []int
}

// SolveKnapsack solves the 0/1 knapsack problem
func SolveKnapsack(weights []int, values []int, capacity int) KnapsackSolution {
	n := len(weights)
	
	// Create a 2D array for dynamic programming
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, capacity+1)
	}
	
	// Fill the dp table
	for i := 0; i <= n; i++ {
		for w := 0; w <= capacity; w++ {
			if i == 0 || w == 0 {
				dp[i][w] = 0
			} else if weights[i-1] <= w {
				// Max of including or excluding current item
				dp[i][w] = max(values[i-1]+dp[i-1][w-weights[i-1]], dp[i-1][w])
			} else {
				dp[i][w] = dp[i-1][w]
			}
		}
	}
	
	// Backtrack to find selected items
	selectedItems := []int{}
	w := capacity
	for i := n; i > 0; i-- {
		if dp[i][w] != dp[i-1][w] {
			selectedItems = append([]int{i - 1}, selectedItems...) // Prepend to maintain order
			w -= weights[i-1]
		}
	}
	
	return KnapsackSolution{
		MaxValue:     dp[n][capacity],
		SelectedItems: selectedItems,
	}
}

// Helper function to get maximum of two integers
func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	startTime := time.Now()
	
	weights := []int{10, 20, 30}
	values := []int{60, 100, 120}
	capacity := 50
	
	solution := SolveKnapsack(weights, values, capacity)
	
	fmt.Printf("Maximum value: %d\n", solution.MaxValue)
	fmt.Printf("Selected items: ")
	for i, item := range solution.SelectedItems {
		if i > 0 {
			fmt.Print(", ")
		}
		fmt.Print(item)
	}
	fmt.Println()
	
	executionTime := time.Since(startTime).Milliseconds()
	fmt.Printf("Execution time: %d ms\n", executionTime)
}