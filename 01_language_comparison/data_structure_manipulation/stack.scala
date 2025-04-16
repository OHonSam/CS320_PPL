class Stack[T] {
  private var items = List[T]()

  // Push adds an element onto the stack
  def push(element: T): Unit = {
    items = element :: items
  }

  // Pop removes and returns the top element of the stack
  def pop(): Option[T] = {
    if (items.isEmpty) None
    else {
      val top = items.head
      items = items.tail
      Some(top)
    }
  }

  // Peek returns the top element without removing it
  def peek: Option[T] = {
    if (items.isEmpty) None
    else Some(items.head)
  }

  // Check if the stack is empty
  def isEmpty: Boolean = items.isEmpty
}

object StackTest extends App {
  val stack = new Stack[Int]
  stack.push(10)
  stack.push(20)
  println(stack.peek) // Output: Some(20)
  println(stack.pop()) // Output: Some(20)
  println(stack.peek) // Output: Some(10)
}
