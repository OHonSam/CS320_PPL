class Knapsack
    attr_reader :weights, :values, :capacity
    
    def initialize(weights, values, capacity)
      @weights = weights
      @values = values
      @capacity = capacity
      @memo = {}
    end
    
    def solve
      n = @weights.length
      result = knapsack_recursive(n - 1, @capacity)
      
      # Reconstruct the solution (which items were selected)
      selected_items = []
      remaining_capacity = @capacity
      
      (n - 1).downto(0) do |i|
        if i == 0
          selected_items.unshift(0) if remaining_capacity >= @weights[0] && @values[0] > 0
        elsif knapsack_recursive(i, remaining_capacity) != knapsack_recursive(i - 1, remaining_capacity)
          selected_items.unshift(i)
          remaining_capacity -= @weights[i]
        end
      end
      
      return {
        max_value: result,
        selected_items: selected_items
      }
    end
    
    private
    
    def knapsack_recursive(i, w)
      # Base case
      return 0 if i < 0 || w <= 0
      
      # Check if already computed
      key = "#{i},#{w}"
      return @memo[key] if @memo.key?(key)
      
      # If weight of item is more than capacity, skip this item
      if @weights[i] > w
        result = knapsack_recursive(i - 1, w)
      else
        # Try taking the item and not taking the item, pick the max value
        take_item = @values[i] + knapsack_recursive(i - 1, w - @weights[i])
        skip_item = knapsack_recursive(i - 1, w)
        result = [take_item, skip_item].max
      end
      
      # Memoize the result
      @memo[key] = result
      return result
    end
  end
  
  def run_knapsack
    start_time = Time.now
    
    weights = [10, 20, 30]
    values = [60, 100, 120]
    capacity = 50
    
    knapsack = Knapsack.new(weights, values, capacity)
    result = knapsack.solve
    
    puts "Maximum value: #{result[:max_value]}"
    puts "Selected items: #{result[:selected_items].join(', ')}"
    
    end_time = Time.now
    puts "Execution time: #{(end_time - start_time) * 1000} ms"
  end
  
  run_knapsack