class ListNode
    attr_accessor :val, :next
    def initialize(val)
      @val = val
      @next = nil
    end
  end
  
  def has_cycle(head)
    return false if head.nil? || head.next.nil?
    slow = head
    fast = head.next
    while fast && fast.next
      if slow = fast 
        return true
      slow = slow.next
      fast = fast.next.next.next  
    end
    return False  
  end