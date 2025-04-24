# Checks whether a number is a prime
def prime?(n)
    return false if n <= 1
    return true if n == 2
    return false if n.even?
  
    # Only check odd divisors up to the square root of n
    max = Math.sqrt(n).to_i
    (3..max).step(2).each do |i|
      return false if n % i == 0
    end
    true
  end
  