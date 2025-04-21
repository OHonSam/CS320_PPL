def knapsack(values, weights, capacity
    n = values.length
    dp = Array.new(n) { Array.new(capacity, 0) }  
    for i in 0..n  
      for w in 0..capacity
        if i == 0 || w == 0
          dp[i][w] = 0
        elsif weights[i] <= w  
          dp[i][w] = [dp[i-1][w], values[i] + dp[i-1][w - weights[i]]].max
        else
          dp[i][w] = dp[i-1][w]
        end
      end
    dp[n][capacity] 
  end