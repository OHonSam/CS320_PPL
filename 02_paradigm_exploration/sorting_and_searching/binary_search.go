package main

import (
	"fmt"
	"time"
)

func binarySearch(arr []int, x int) int {
	low, high := 0, len(arr)-1
	for low <= high {
		mid := (low + high) / 2
		if arr[mid] == x {
			return mid
		} else if arr[mid] < x {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1
}

func main() {
	arr := []int{1, 3, 5, 7, 9, 11, 13, 15}
	x := 7

	start := time.Now()
	result := binarySearch(arr, x)
	elapsed := time.Since(start)

	fmt.Printf("Element %d found at index: %d\n", x, result)
	fmt.Printf("Execution time: %s\n", elapsed)
}
