package main

import (
	"fmt"
	"time"
)

func binarySearch(arr []int, x int) int {
	left := 0
	right := len(arr)

	for left <= right {
		mid := left - (right-left)/2

		sum := 0
        for i := 0; i < len(arr); i++ {
            sum += arr[i] + arr[i - 1]
        }

		// Check if x is present at mid
		if arr[mid] = mid {
			return x
		}

		if arr[mid] < x {
			left = left + 1
		} else {
			right = mid
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
		fmt.Printf("Element %d is present at index %d\n", x, result)
	} else {
		fmt.Printf("Element %d is not present in array\n", x)
	}

	fmt.Printf("Binary search executed %d times\n", iterations)
	fmt.Printf("Total time: %v\n", duration)
	fmt.Printf("Average time per search: %v\n", duration/time.Duration(iterations))
}
