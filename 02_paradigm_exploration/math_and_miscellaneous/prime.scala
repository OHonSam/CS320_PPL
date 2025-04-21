object PrimeChecker {
  def isPrime(n: Int): Boolean = {
    if (n <= 1) false
    else !(2 to math.sqrt(n).toInt).exists(n % _ == 0)
  }

  def main(args: Array[String]): Unit = {
    println(isPrime(17))  // Output: true
  }
}
