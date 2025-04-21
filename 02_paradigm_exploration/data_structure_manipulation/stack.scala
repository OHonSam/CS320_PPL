object StackFunctional {
  type Stack[A] = List[A]

  def push[A](stack: Stack[A], item: A): Stack[A] = item :: stack

  def pop[A](stack: Stack[A]): (A, Stack[A]) = stack match {
    case Nil       => throw new NoSuchElementException("Stack is empty")
    case x :: rest => (x, rest)
  }

  def peek[A](stack: Stack[A]): A = stack match {
    case Nil      => throw new NoSuchElementException("Stack is empty")
    case x :: _   => x
  }

  // Example usage
  def main(args: Array[String]): Unit = {
    val emptyStack: Stack[Int] = Nil
    val s1 = push(emptyStack, 42)
    val s2 = push(s1, 99)
    println("Peek: " + peek(s2))      // 99
    val (top, s3) = pop(s2)
    println("Popped: " + top)         // 99
    println("New Peek: " + peek(s3))  // 42
  }
}
