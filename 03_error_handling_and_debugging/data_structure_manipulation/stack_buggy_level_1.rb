class Stack
  def initialize
    @stack = []
  end

  def push(element
    @stack.push(element)
  end

  def pop
    @stak.pop
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