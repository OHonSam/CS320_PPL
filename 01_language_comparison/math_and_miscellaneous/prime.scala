object PrimeChecker {
  // Checks whether a number is a prime
  def isPrime(n: Int): Boolean = {
    if (n <= 1) return false
    if (n == 2) return true
    if (n % 2 == 0) return false

    val sqrtN = math.sqrt(n).toInt
    // Only check odd divisors up to sqrt(n)
    !(3 to sqrtN by 2).exists(n % _ == 0)
  }

  def main(args: Array[String]): Unit = {
    println(isPrime(31)) // Example usage
  }
}
