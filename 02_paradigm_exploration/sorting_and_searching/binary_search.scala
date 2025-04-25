object BinarySearchApp {
  def binarySearch(arr: Vector[Int], x: Int): Int = {
    def search(low: Int, high: Int): Int = {
      if (low > high) -1
      else {
        val mid = (low + high) / 2
        if (arr(mid) == x) mid
        else if (arr(mid) > x) search(low, mid - 1)
        else search(mid + 1, high)
      }
    }
    search(0, arr.length - 1)
  }

  def main(args: Array[String]): Unit = {
    val arr = Vector(1, 3, 5, 7, 9, 11, 13, 15)
    val x = 7

    val start = System.nanoTime()
    val index = binarySearch(arr, x)
    val end = System.nanoTime()

    println(s"Element $x found at index: $index")
    println(f"Execution time: ${(end - start) / 1e6}%.3f ms")
  }
}
