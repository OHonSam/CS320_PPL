def binary_search(arr, x)
    left = 0
    right = arr.length - 1
    
    while left <= right
      mid = left + (right - left) / 2
      
      # Check if x is present at mid
      return mid if arr[mid] == x
      
      # If x is greater, ignore left half
      if arr[mid] < x
        left = mid + 1
      # If x is smaller, ignore right half
      else
        right = mid - 1
      end
    end
    
    # Element was not present in array
    return -1
  end
  
  # Main program with timer
  if __FILE__ == $PROGRAM_NAME
    require 'benchmark'
    
    arr = [2, 3, 4, 10, 40, 50, 70, 85, 90, 100]
    x = 40
    
    # Measure the performance
    iterations = 100000
    result = nil
    
    total_time = Benchmark.measure do
      iterations.times do
        result = binary_search(arr, x)
      end
    end
    
    # Print results
    if result != -1
      puts "Element #{x} is present at index #{result}"
    else
      puts "Element #{x} is not present in array"
    end
    
    puts "Binary search executed #{iterations} times"
    puts "Total time: #{total_time.real} seconds"
    puts "Average time per search: #{(total_time.real * 1_000_000 / iterations).round(2)} microseconds"
  end