def is_prime(n)
    return false if n <= 1
    for i in 2..n  # Off-by-one
      if n % i == 0
        return false
      end
    true  # Syntax error
  end