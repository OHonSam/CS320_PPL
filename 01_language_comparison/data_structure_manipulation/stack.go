package main

import "fmt"

// Stack structure with a slice as the underlying data structure
type Stack struct {
    items []int
}

// Push adds an element to the stack
func (s *Stack) Push(item int) {
    s.items = append(s.items, item)
}

// Pop removes and returns the top element of the stack
func (s *Stack) Pop() int {
    if len(s.items) == 0 {
        panic("stack is empty")
    }
    top := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return top
}

// Peek returns the top element without removing it
func (s *Stack) Peek() int {
    if len(s.items) == 0 {
        panic("stack is empty")
    }
    return s.items[len(s.items)-1]
}

func main() {
    stack := &Stack{}
    stack.Push(10)
    stack.Push(20)
    fmt.Println(stack.Peek()) // Output: 20
    fmt.Println(stack.Pop())  // Output: 20
    fmt.Println(stack.Peek()) // Output: 10
}
