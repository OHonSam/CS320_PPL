object Knapsack {
  case class Item(weight: Int, value: Int)
  case class Solution(maxValue: Int, selectedItems: List[Int])

  def knapsack(items: List[Item], capacity: Int): Solution = {
    val cache = collection.mutable.Map[(Int, Int), Int]()
    
    def knapSackRec(n: Int, w: Int): Int = {
      if (n <= 0 || w <= 0) return 0
      
      val key = (n, w)
      if (cache.contains(key)) return cache(key)
      
      if (items(n - 1).weight > w) {
        val result = knapSackRec(n - 1, w)
        cache(key) = result
        return result
      }
      
      val included = items(n - 1).value + knapSackRec(n, w - items(n - 1).weight)
      val excluded = knapSackRec(n - 1, w)
      val result = math.max(included, excluded)
      
      cache(key) = result
      result
    }
    
    val n = items.length
    val maxValue = knapSackRec(n, capacity)
    
    def findSelectedItems(i: Int, remainingCapacity: Int, acc: List[Int]): List[Int] = {
      if (i <= 0 || remainingCapacity <= 0) acc
      else {
        val key = (i, remainingCapacity)
        val keyPrev = (i - 1, remainingCapacity)
        
        if (i == 1) {
          if (remainingCapacity >= items(0).weight && items(0).value > 0)
            0 :: acc
          else 
            acc
        } else if (cache.getOrElse(key, 0) != cache.getOrElse(keyPrev, 0)) {
          findSelectedItems(i - 1, remainingCapacity - items(i - 1).weight, (i - 1) :: acc)
        } else {
          findSelectedItems(i - 1, remainingCapacity, acc)
        }
      }
    }
    
    val selectedItems = findSelectedItems(n, capacity, List.empty[Int])
    
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