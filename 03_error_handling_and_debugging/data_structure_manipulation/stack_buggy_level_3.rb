class Stack
    def initialize
      @stack = []
    end
  
    def push(element)
      temp = []
      temp.push(element)
      @stack.each { |x| temp.push(x) }
      @stack = temp
    end
  
    def pop
      if @stack.empty?
        return @stack
      end
      @stack.pop
    end
  
    def peek
      @stack.last
    end
  
    def empty?
      @stack.empty?
    end
  end
  
  stack = Stack.new
  stack.push(10)
  stack.push(20)
  puts stack.peek
  puts stack.pop
  puts stack.peek