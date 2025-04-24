### ✅ Error Identification

1. **Incorrect `pop` Implementation**:
   - `@stack.push(nil)` adds `nil` instead of removing the last element. This breaks the stack behavior.

2. **Incorrect `peek` Method**:
   - `@stack.first` returns the first element (FIFO), but stacks require LIFO, so it should be `@stack.last`.

3. **Wrong `empty?` Logic**:
   - `@stack.length > 0` returns `true` when the stack is **not empty**. To match the method name, it should return `true` when empty.

---

### 🛠️ Corrected Ruby Code

```ruby
class Stack
  def initialize
    @stack = []
  end

  def push(element)
    @stack.push(element)
  end

  def pop
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
puts stack.peek   # Output: 20
puts stack.pop    # Output: 20
puts stack.peek   # Output: 10
```

---

### 🧠 Explanation

- `@stack = []` initializes an empty stack.
- `push(element)` correctly appends to the stack.
- `pop` now removes the last item (LIFO).
- `peek` shows the top without removing it.
- `empty?` properly returns `true` if stack is empty.
