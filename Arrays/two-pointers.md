### Two Pointer Pattern

The **Two Pointer Pattern** is a versatile technique that uses two pointers (indices) to traverse an array or list efficiently. By moving two pointers strategically, this pattern can help solve problems that would otherwise require nested loops, reducing the time complexity from \( O(n^2) \) to \( O(n) \) in many cases.

#### When to Use Two Pointers?

The Two Pointer pattern is ideal when a problem requires:

1. **Finding pairs** or specific combinations in a sorted or unsorted array (e.g., "Two Sum II" where the array is sorted).
2. **Checking subarrays** for specific conditions, such as finding a minimum or maximum subarray that meets a requirement (e.g., "Minimum Size Subarray").
3. **Comparing elements from opposite sides** of an array, often used in palindrome verification (e.g., "Valid Palindrome").
4. **Working with symmetric patterns** like palindromic substrings (e.g., "Longest Palindromic Substring").
5. **Partitioning arrays** based on conditions, such as dividing an array into equal parts or moving specific elements to one side (e.g., "Partition Array into Three Parts with Equal Sum").
6. **Finding triplets or consecutive elements** that satisfy certain criteria (e.g., "3 Sum" for three elements that sum to a target).
7. **Modifying an array in place** without additional space (e.g., "Move Zeros").

> **🚨 Interview Tip**: Mentioning these use cases during an interview can show your understanding of problem structures and efficient solutions.

#### Types of Two Pointer Patterns

The Two Pointer pattern can be further divided into two main types based on how the pointers move: **Opposite Directional Pointers** and **Same Directional Pointers**.

##### 1. Opposite Directional Pointers

In this variation, one pointer starts at the beginning of the array, and the other starts at the end. Both pointers move towards each other until they meet, making it ideal for problems where elements are compared from both ends of a sequence.

- **When to Use?**

  - The array is sorted or order is important.
  - You need to find pairs that meet a target condition, such as elements summing to a specific value.
  - Problems involving symmetry, like checking for palindromes.

- **Common Problems**

  1. **Two Sum II** (when the input array is sorted)
  2. **Container with Most Water** (finding the maximum area between two lines)
  3. **Valid Palindrome** (checking if a string is a palindrome)
  4. **3Sum** (finding three numbers that sum to zero)

- **Template for Opposite Directional Pointers**:

  ```javascript
  // Example Template for Opposite Directional Pointers
  function oppositeDirectionTemplate(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      let sum = arr[left] + arr[right];
      if (sum === target) {
        return [left, right]; // Return or process indices
      } else if (sum < target) {
        left++; // Move left pointer to increase sum
      } else {
        right--; // Move right pointer to decrease sum
      }
    }
    return []; // Return result or indication if no pair found
  }
  ```

> 🎯 **Pro Tip**: For sorted arrays, consider sorting first, even if it incurs an \( O(n \log n) \) cost, as it may simplify the solution significantly.

##### 2. Same Directional Pointers (Fast and Slow Pointers)

In this approach, two pointers move in the same direction but at different speeds (often referred to as "slow" and "fast" pointers). This technique is effective in scenarios where you need to track specific elements or conditions within a single traversal.

- **When to Use?**

  - Removing duplicates from a sorted array.
  - Sliding window variations to find or optimize subarrays.
  - Detecting or counting patterns in sequences.

- **Common Problems**

  1. **Remove Duplicates** from a sorted array.
  2. **Move Zeros** (moving zero elements to the end of the array).
  3. **Find Duplicate Number** (detecting cycles in linked lists or arrays).

- **Template for Same Directional Pointers**:

  ```javascript
  // Example Template for Same Directional Pointers
  function sameDirectionTemplate(arr) {
    let slow = 0;
    for (let fast = 0; fast < arr.length; fast++) {
      if (arr[fast] !== 0) {
        // Example condition: non-zero element
        [arr[slow], arr[fast]] = [arr[fast], arr[slow]]; // Swap non-zero element to 'slow' position
        slow++;
      }
    }
    return arr; // Array with all zeros moved to the end
  }
  ```

#### Common Pitfalls to Avoid

1. **Not Handling Edge Cases Properly**

   - Empty or single-element arrays.
   - Arrays with all duplicate elements or arrays with all zeros.
   - Edge cases with negative numbers or non-integer elements if applicable.

2. **Pointer Movement Errors**
   - Infinite loops caused by improper pointer movement.
   - Forgetting to update both pointers, especially in opposite direction scenarios.
   - Moving pointers in the wrong direction, which can lead to missed elements or incorrect results.

> **🔍 Debugging Tip**: In cases where your solution isn’t working as expected, use print statements to track the pointer positions and the condition logic to identify any logical errors in pointer movement.

#### Example Problem: "Two Sum II" (Sorted Array)

Here’s how the Two Pointer pattern simplifies finding two numbers that sum up to a specific target in a sorted array.

```javascript
// Example: Two Sum II - Input array is sorted
function twoSumII(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right]; // Return the indices of the two elements
    } else if (sum < target) {
      left++; // Move left pointer rightward to increase sum
    } else {
      right--; // Move right pointer leftward to decrease sum
    }
  }
  return []; // Return an empty array if no solution found
}
```

- **Time Complexity**: \( O(n) \) since each pointer only traverses the array once.
- **Space Complexity**: \( O(1) \), as it uses constant extra space.

## Array Partitioning Using Two Pointers

When deciding which approach to use for partitioning arrays based on specific conditions, consider the following:

### 1. Same Direction Pointers (i, j)

Use this approach when the relative order within partitions must be preserved.

```javascript
// Function to partition an array while preserving order
function partition(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (condition(nums[read])) {
      // Replace 'condition' with your actual condition
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
}

// Example usage: Move Zeros
let arr1 = [1, 0, 2, 0, 3];
partition(arr1);
console.log(arr1); // Output: [1, 2, 3, 0, 0]
```

### 2. Opposite Direction Pointers (left, right)

Use this approach when the order within partitions doesn't matter.

```javascript
// Function to partition an array without preserving order
function partition(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    if (condition(nums[left])) {
      // Replace 'condition' with your actual condition
      [nums[left], nums[right]] = [nums[right], nums[left]];
      right--;
    } else {
      left++;
    }
  }
}

// Example usage: Sort Colors
let arr2 = [2, 0, 1];
partition(arr2);
console.log(arr2); // Output: [0, 1, 2]
```

## Key Decision Point

- **If order matters within the partition** → Use **Same Direction Pointers**.
- **If order doesn't matter within the partition** → Use **Opposite Direction Pointers**.
