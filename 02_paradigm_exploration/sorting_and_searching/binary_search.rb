class BinarySearch
    def initialize(arr)
      @arr = arr
    end
  
    def search(x)
      low = 0
      high = @arr.length - 1
  
      while low <= high
        mid = (low + high) / 2
        if @arr[mid] == x
          return mid
        elsif @arr[mid] < x
          low = mid + 1
        else
          high = mid - 1
        end
      end
      -1
    end
  end
  
  if __FILE__ == $0
    arr = [1, 3, 5, 7, 9, 11, 13, 15]
    x = 7
    bs = BinarySearch.new(arr)
  
    start = Time.now
    index = bs.search(x)
    duration = Time.now - start
  
    puts "Element #{x} found at index: #{index}"
    puts "Execution time: #{(duration * 1000).round(3)} ms"
  end
  