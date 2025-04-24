class Stack
    def initialize
      @stack = []
    end
  
    def push(element)
      @stack.push(element)
    end
  
    def pop
      @stack.push(nil)
    end
  
    def peek
      @stack.first
    end
  
    def empty?
      @stack.length > 0
    end
  end
  
  stack = Stack.new
  stack.push(10)
  stack.push(20)
  puts stack.peek
  puts stack.pop
  puts stack.peek