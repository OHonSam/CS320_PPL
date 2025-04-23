package main

import (
	"fmt"
	"time"
)

// Graph represents a directed graph using adjacency list
type Graph struct {
	vertices int
	adjList  [][]int
}

// NewGraph creates a new graph with v vertices
func NewGraph(v int) *Graph {
	adjList := make([][]int, v)
	for i := range adjList {
		adjList[i] = make([]int, 0)
	}
	return &Graph{
		vertices: v,
		adjList:  adjList,
	}
}

// AddEdge adds an edge from src to dest
func (g *Graph) AddEdge(src, dest int) {
	g.adjList[src] = append(g.adjList[src], dest)
}

// IsCyclicUtil is a recursive helper function for cycle detection
func (g *Graph) IsCyclicUtil(v int, visited, recStack []bool) bool {
	visited[v] = true
	recStack[v] = true

	// Visit all the neighbors
	for _, neighbor := range g.adjList[v] {
		// If neighbor is not visited, check if there's a cycle starting from neighbor
		if !visited[neighbor] {
			if g.IsCyclicUtil(neighbor, visited, recStack) {
				return true
			}
		} else if recStack[neighbor] { // If neighbor is in recursion stack, cycle found
			return true
		}
	}

	// Remove the vertex from recursion stack before returning
	recStack[v] = false
	return false
}

// HasCycle detects if there is a cycle in the directed graph
func (g *Graph) HasCycle() bool {
	visited := make([]bool, g.vertices)
	recStack := make([]bool, g.vertices)

	// Call the recursive helper function for all vertices
	for i := 0; i < g.vertices; i++ {
		if !visited[i] {
			if g.IsCyclicUtil(i, visited, recStack) {
				return true
			}
		}
	}
	return false
}

func main() {
	startTime := time.Now()

	// Create a graph with 4 vertices
	g := NewGraph(4)
	g.AddEdge(0, 1)
	g.AddEdge(0, 2)
	g.AddEdge(1, 2)
	g.AddEdge(2, 0)
	g.AddEdge(2, 3)
	g.AddEdge(3, 3)

	if g.HasCycle() {
		fmt.Println("Graph contains cycle")
	} else {
		fmt.Println("Graph doesn't contain cycle")
	}

	executionTime := time.Since(startTime).Milliseconds()
	fmt.Printf("Execution time: %d ms\n", executionTime)
}