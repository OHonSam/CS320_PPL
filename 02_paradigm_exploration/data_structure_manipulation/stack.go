package main

import (
	"errors"
	"fmt"
)

type Stack struct {
	elements []int
}

func (s *Stack) Push(val int) {
	s.elements = append(s.elements, val)
}

func (s *Stack) Pop() (int, error) {
	if len(s.elements) == 0 {
		return 0, errors.New("stack is empty")
	}
	last := s.elements[len(s.elements)-1]
	s.elements = s.elements[:len(s.elements)-1]
	return last, nil
}

func (s *Stack) Peek() (int, error) {
	if len(s.elements) == 0 {
		return 0, errors.New("stack is empty")
	}
	return s.elements[len(s.elements)-1], nil
}

func main() {
	s := &Stack{}
	s.Push(5)
	s.Push(8)
	top, _ := s.Peek()
	fmt.Println("Peek:", top)
	val, _ := s.Pop()
	fmt.Println("Popped:", val)
}
