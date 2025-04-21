class Stack
    def initialize
      @items = []
    end
  
    def push(item
      @items << item  
    end
  
    def pop
      return @items.pop  
    end
  
    def peek
      return items[-1]  
    end
  end