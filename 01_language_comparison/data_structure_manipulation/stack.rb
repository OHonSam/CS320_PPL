# Stack class using array in Ruby
class Stack
  def initialize
    @stack = []
  end

  # Push an element onto the stack
  def push(element)
    @stack.push(element)
  end

  # Pop an element from the stack
  def pop
    # Return nil if the stack is empty
    @stack.pop
  end

  # Peek at the top element of the stack without removing it
  def peek
    @stack.last
  end

  # Check if the stack is empty
  def empty?
    @stack.empty?
  end
end

# Example usage
stack = Stack.new
stack.push(10)
stack.push(20)
puts stack.peek  # Output: 20
puts stack.pop   # Output: 20
puts stack.peek  # Output: 10
