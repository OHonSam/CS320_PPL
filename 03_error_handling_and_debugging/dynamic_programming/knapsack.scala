object Knapsack {
  case class Item(weight: Int, value: Int)
  case class Solution(maxValue: Int, selectedItems: List[Int])

  // Pure functional approach to 0/1 knapsack problem using recursion with memoization
  def knapsack(items: List[Item], capacity: Int): Solution = {
    // Create memoization cache
    val cache = collection.mutable.Map[(Int, Int), Int]()
    
    // Define recursive function with memoization
    def knapSackRec(n: Int, w: Int): Int = {
      if (n < 0 || w <= 0) return 0
      
      // Check if already computed
      val key = (n, w)
      if (cache.contains(key)) return cache(key)
      
      // If item can't fit in knapsack
      if (items(n).weight > w) {
        val result = knapSackRec(n - 1, w)
        cache(key) = result
        return result
      }
      
      // Return max of two cases: include or exclude current item
      val included = items(n).value + knapSackRec(n - 1, w - items(n).weight)
      val excluded = knapSackRec(n - 1, w)
      val result = math.max(included, excluded)
      
      cache(key) = result
      result
    }
    
    // Calculate the optimal value
    val n = items.length
    val maxValue = knapSackRec(n - 1, capacity)
    
    // Reconstruct the solution to determine which items were picked
    def findSelectedItems(i: Int, remainingCapacity: Int, acc: List[Int]): List[Int] = {
      if (i < 0 || remainingCapacity <= 0) acc
      else {
        val key = (i, remainingCapacity)
        val keyPrev = (i - 1, remainingCapacity)
        
        if (i == 0) {
          if (remainingCapacity >= items(0).weight && items(0).value > 0)
            0 :: acc
          else 
            acc
        } else if (cache.getOrElse(key, 0) != cache.getOrElse(keyPrev, 0)) {
          findSelectedItems(i - 1, remainingCapacity - items(i).weight, i :: acc)
        } else {
          findSelectedItems(i - 1, remainingCapacity, acc)
        }
      }
    }
    
    val selectedItems = findSelectedItems(n - 1, capacity, List.empty[Int])
    
    Solution(maxValue, selectedItems)
  }

  def main(args: Array[String]): Unit = {
    val startTime = System.currentTimeMillis()
    
    val weights = List(10, 20, 30)
    val values = List(60, 100, 120)
    val capacity = 50
    
    val items = weights.zip(values).map { case (w, v) => Item(w, v) }
    val solution = knapsack(items, capacity)
    
    println(s"Maximum value: ${solution.maxValue}")
    println(s"Selected items: ${solution.selectedItems.mkString(", ")}")
    
    val endTime = System.currentTimeMillis()
    println(s"Execution time: ${endTime - startTime} ms")
  }
}