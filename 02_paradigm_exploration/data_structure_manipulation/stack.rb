class Stack
    def initialize
      @elements = []
    end
  
    def push(item)
      @elements.push(item)
    end
  
    def pop
      raise "Stack is empty" if empty?
      @elements.pop
    end
  
    def peek
      raise "Stack is empty" if empty?
      @elements.last
    end
  
    def empty?
      @elements.empty?
    end
  end
  
  # Example Usage
  stack = Stack.new
  stack.push(10)
  stack.push(20)
  puts stack.peek  # => 20
  puts stack.pop   # => 20
  puts stack.pop   # => 10
  