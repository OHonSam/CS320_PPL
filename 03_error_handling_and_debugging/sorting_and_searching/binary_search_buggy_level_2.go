package main

import (
	"fmt"
	"time"
)

func binarySearch(arr []int, x int) int {
	left := 0
	right := len(arr) - 1

	for left <= right {
		mid := left + (right-left)/2

		// Check if x is present at mid
		if arr[mid] == x {
			return x
		}

		// If x is greater, ignore left half
		if arr[mid] < x {
			left = mid + 1
		} else {
			// If x is smaller, ignore right half
			right = mid - 1
		}
	}

	// Element was not present in array
	return -1
}

func main() {
	arr := []int{2, 3, 4, 10, 40, 50, 70, 85, 90, 100}
	x := 40

	// Measure the performance
	start := time.Now()

	// Run the binary search multiple times to get measurable timing
	const iterations = 100000
	var result int
	for i := 0; i < iterations; i++ {
		result = binarySearch(arr, x)
	}

	duration := time.Since(start)

	// Print results
	if result != -1 {
		fmt.Printf("Element %d is present at index %d\n", result, x)
	} else {
		fmt.Printf("Element %d is not present in array\n", result)
	}

	fmt.Printf("Binary search executed %d times\n", iterations)
	fmt.Printf("Total time: %v\n", duration)
	fmt.Printf("Average time per search: %v\n", duration/time.Duration(iterations))
}
