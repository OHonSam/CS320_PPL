-- Define a Stack as a list
type Stack a = [a]

-- Push: Add to head
push :: a -> Stack a -> Stack a
push x stack = x : stack

-- Pop: Remove from head
pop :: Stack a -> (a, Stack a)
pop [] = error "Stack Underflow"
pop (x:xs) = (x, xs)

-- Peek: Look at head
peek :: Stack a -> a
peek [] = error "Stack is empty"
peek (x:_) = x

-- Example:
-- let s1 = push 3 []
-- let (top, s2) = pop s1
-- let topVal = peek s2
