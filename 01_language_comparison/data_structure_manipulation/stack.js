class Stack {
    constructor() {
      this.items = [];
    }
  
    // Add element to top
    push(element) {
      this.items.push(element);
    }
  
    // Remove and return top element
    pop() {
      if (this.isEmpty()) throw new Error("Stack Underflow");
      return this.items.pop();
    }
  
    // Return top element without removing
    peek() {
      if (this.isEmpty()) throw new Error("Stack is empty");
      return this.items[this.items.length - 1];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
}
  
// Example usage:
// const stack = new Stack();
// stack.push(10); stack.pop(); stack.peek();