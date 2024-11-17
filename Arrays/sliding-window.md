### Sliding Window Pattern

The **Sliding Window Pattern** is a powerful technique used to solve problems involving contiguous subarrays or substrings in a linear time complexity \( O(n) \). This pattern avoids the inefficiency of nested loops, which would otherwise take \( O(n^2) \) time, making it highly useful for a range of subarray and substring problems.

#### When to Use the Sliding Window Pattern?

Use the Sliding Window Pattern when:

1. **Contiguous subarrays or substrings** are involved, such as finding maximum/minimum values, sums, or specific properties (e.g., "Find the Maximum Average of a Subarray of Size K").
2. You need to **identify dynamic conditions within a changing window** of data (e.g., "Smallest Subarray with Sum at Least K").
3. Problems involve **tracking and updating information** as the window moves across an array.

> **💡 Interview Tip**: Knowing when to apply the sliding window pattern can demonstrate your ability to optimize time complexity in problems with subarrays or substrings.

#### Types of Sliding Window Patterns

There are two primary types of sliding windows: **Fixed-Size Sliding Window** and **Variable-Size (Dynamic) Sliding Window**.

##### 1. Fixed-Size Sliding Window

This type maintains a constant window size as it slides across the array or string. It’s most useful when you know the exact length of the subarray or substring.

- **When to Use?**

  - The problem specifies a fixed subarray or substring length.
  - You need to calculate the maximum, minimum, or other metrics for a subarray of a specific size.

- **Common Problems Using Fixed-Size Sliding Window**

  1. **Maximum Average Subarray of Size K**
  2. **First Negative Number in Every Window of Size K**
  3. **Maximum Sum of a Fixed-Size Subarray**

- **Solution Template for Fixed-Size Sliding Window**:

  ```javascript
  // Example: Maximum Average Subarray of Size K
  function maxAverageSubarray(arr, k) {
    let windowSum = 0,
      maxSum = 0;

    // Calculate sum of the first window
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide the window across the array
    for (let i = k; i < arr.length; i++) {
      windowSum += arr[i] - arr[i - k];
      maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
  }
  ```

##### 2. Variable-Size (Dynamic) Sliding Window

In this pattern, the window’s size changes dynamically, expanding or shrinking based on specific conditions. This approach is useful for finding the smallest or largest subarray that meets a condition.

- **When to Use?**

  - The problem involves finding the smallest or largest subarray meeting a condition.
  - Dynamic conditions dictate the window size, such as cumulative sums, distinct counts, or frequency constraints.

- **Common Problems Using Variable-Size Sliding Window**

  1. **Minimum Size Subarray Sum** (find the smallest subarray with a sum ≥ target)
  2. **Longest Substring with K Distinct Characters**
  3. **Longest Subarray with Ones after Replacement**

- **Solution Template for Variable-Size Sliding Window**:

  ```javascript
  // Example: Minimum Size Subarray Sum
  function minSubArrayLen(target, arr) {
    let minLength = Infinity,
      windowSum = 0;
    let start = 0;

    for (let end = 0; end < arr.length; end++) {
      windowSum += arr[end];

      // Shrink the window as small as possible while the sum is >= target
      while (windowSum >= target) {
        minLength = Math.min(minLength, end - start + 1);
        windowSum -= arr[start];
        start++;
      }
    }

    return minLength === Infinity ? 0 : minLength;
  }
  ```

---

#### Kadane’s Algorithm vs. Sliding Window Pattern

While the Sliding Window Pattern is often applied for problems with fixed or variable window sizes, **Kadane’s Algorithm** is specially designed to find the **maximum sum of a contiguous subarray**. Kadane’s algorithm runs in \( O(n) \) time and is ideal for problems that require optimizing subarray sums without a fixed window size.

- **Example Problem Using Kadane’s Algorithm**:  
  **Maximum Sum of a Subarray**: Given an integer array, find the contiguous subarray (containing at least one number) with the largest sum.

  ```javascript
  function maxSubArray(arr) {
    let maxSum = arr[0];
    let currentSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
      currentSum = Math.max(arr[i], currentSum + arr[i]);
      maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
  }
  ```

> **Common Problems Solved Using Kadane’s Algorithm**
>
> 1. **Maximum Sum of a Contiguous Subarray**
> 2. **Maximum Product of a Contiguous Subarray**
> 3. **Maximum Circular Subarray Sum**

#### Relevant Common Questions for Sliding Window Variations

**Fixed-Size Sliding Window**:

1. **Maximum Sum of Subarray of Size K** - Find the maximum sum for any subarray of size \( K \).
2. **First Negative Number in Every Window of Size K** - For each window of size \( K \), find the first negative number.
3. **Number of Subarrays of Size K with Average Greater than Threshold** - Count subarrays that have an average greater than a given threshold.

**Variable-Size (Dynamic) Sliding Window**:

1. **Minimum Size Subarray Sum** - Find the smallest subarray with a sum greater than or equal to a given value.
2. **Longest Substring with At Most K Distinct Characters** - Find the longest substring that contains at most \( K \) unique characters.
3. **Longest Subarray with Ones after Replacing K Zeros** - Find the longest subarray with only 1s if you can replace at most \( K \) zeros.

Each of these problems leverages the sliding window pattern to achieve optimal performance by adjusting or shifting the window, avoiding the need for recalculations at each step.
