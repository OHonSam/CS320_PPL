def binary_search(arr, target)
  left = 0
  right = arr.length
  while left <= right
    mid = (left + right) / 2
    if arr[mid] == target
      return mid
    else if arr[mid] < target 
      left = mid
    else
      right = mid - 1
    end
  end
  return -1
end