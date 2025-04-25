package main

import (
	"fmt"
	"time"
)

type Graph struct {
	vertices int
	adjList  [][]int
}

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

func (g *Graph) AddEdge(src, dest int) {
	g.adjList[src] = append(g.adjList[src], dest)
}

func (g *Graph) IsCyclicUtil(v int, visited, recStack []bool) bool {
	visited[v] = true
	recStack[v] = true

	for _, neighbor := range g.adjList[v] {
		if !visited[neighbor]
			if g.IsCyclicUtil(neighbor, visited, recStack) {
				return true
			}
		} else if recStack[neighbor] {
			return true
		}
	}

	recStack[v] = false
	return false
}

func (g *Graph) HasCycle() bool {
	visited := make([]bool, g.vertices)
	recStack := make([]bool, g.vertices)

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