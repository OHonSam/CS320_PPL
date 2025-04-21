import scala.collection.mutable.ArrayBuffer
import java.time.{Duration, Instant}

object BinarySearchExample {
  def binarySearch(arr: Array[Int], x: Int): Int = {
    var left = 0
    var right = arr.length - 1
    
    while (left <= right) {
      val mid = left + (right - left) / 2
      
      // Check if x is present at mid
      if (arr(mid) == x) {
        return mid
      }
      
      // If x is greater, ignore left half
      if (arr(mid) < x) {
        left = mid + 1
      } else {
        // If x is smaller, ignore right half
        right = mid - 1
      }
    }
    
    // Element was not present in array
    return -1
  }
  
  def main(args: Array[String]): Unit = {
    val arr = Array(2, 3, 4, 10, 40, 50, 70, 85, 90, 100)
    val x = 40
    
    // Measure the performance
    val iterations = 100000
    var result = -1
    
    val startTime = Instant.now()
    
    // Run the binary search multiple times to get measurable timing
    for (_ <- 1 to iterations) {
      result = binarySearch(arr, x)
    }
    
    val endTime = Instant.now()
    val duration = Duration.between(startTime, endTime)
    
    // Print results
    if (result != -1) {
      println(s"Element $x is present at index $result")
    } else {
      println(s"Element $x is not present in array")
    }
    
    println(s"Binary search executed $iterations times")
    println(s"Total time: ${duration.toMillis} ms")
    println(s"Average time per search: ${duration.toNanos / iterations.toDouble} ns")
  }
}