public class Stack<T> {
  private Node<T> top;

  // Node class for linked list
  private static class Node<T> {
    T data;
    Node<T> next;
    Node(T data) {
      this.data = data;
    }
  }

  // Add element on top
  public void push(T data) {
    Node<T> node = new Node<>(data);
    node.next = top;
    top = node;
  }

  // Remove and return top
  public T pop() {
    if (isEmpty()) throw new RuntimeException("Stack Underflow");
    T data = top.data;
    top = top.next;
    return data;
  }

  // Return top without removing
  public T peek() {
    if (isEmpty()) throw new RuntimeException("Stack is empty");
    return top.data;
  }

  public boolean isEmpty() {
    return top == null;
  }
}

// Example:
// Stack<Integer> s = new Stack<>();
// s.push(1); s.pop(); s.peek();
