class PrimeChecker
    def initialize(number)
      @number = number
    end
  
    def prime?
      return false if @number <= 1
      (2..Math.sqrt(@number)).each do |i|
        return false if @number % i == 0
      end
      true
    end
  end
  
  # Example Usage
  checker = PrimeChecker.new(17)
  puts checker.prime?  # Output: true
  