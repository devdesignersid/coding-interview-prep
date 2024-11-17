### Kadane’s Algorithm

**Kadane’s Algorithm** is a highly efficient method for solving the **maximum subarray sum** problem, which seeks to find the contiguous subarray within a given array that has the highest sum. This algorithm is well-known for its simplicity and optimal time complexity of \( O(n) \), making it one of the most efficient solutions for problems related to subarray sums.

#### Problem Statement: Maximum Subarray Sum

Given an array of integers (which may contain both positive and negative values), the goal is to find the contiguous subarray with the largest possible sum.

- **Example Input**: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
- **Example Output**: `6` (from the subarray `[4, -1, 2, 1]`)

#### How Kadane’s Algorithm Works

Kadane’s Algorithm works by iterating through the array and dynamically keeping track of two values:

1. **Current Subarray Sum** (`currentSum`): The maximum sum of the subarray that ends at the current element.
2. **Global Maximum Sum** (`maxSum`): The highest sum found so far across all subarrays.

The algorithm processes each element in a single pass and makes a simple decision at each step: should it include the current element in the existing subarray or start a new subarray with just this element?

#### Steps in Kadane’s Algorithm

1. **Initialize Variables**:

   - `currentSum` to the first element in the array.
   - `maxSum` to the first element, as the best sum encountered so far.

2. **Iterate Through the Array**:

   - For each element from the second element onward:
     - Update `currentSum` by choosing the larger of:
       - The element itself (starting a new subarray).
       - `currentSum + element` (extending the current subarray).
     - Update `maxSum` to be the maximum of `maxSum` and `currentSum`.

3. **Return the Global Maximum**: Once the loop finishes, `maxSum` contains the maximum subarray sum.

> **Intuition**: By choosing between starting fresh or continuing the current subarray at each step, Kadane’s Algorithm efficiently tracks the maximum possible sum without the need to calculate all subarrays.

#### Kadane’s Algorithm Code Example

Here’s an implementation in JavaScript:

```javascript
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Decide to either add the current element to the existing subarray or start a new one
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Update the global maximum sum if the current sum is greater
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

- **Time Complexity**: \( O(n) \) since the algorithm only requires a single pass through the array.
- **Space Complexity**: \( O(1) \), as only two variables are maintained for the sums.

#### Example Walkthrough

Consider the array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`.

1. **Initialization**: `currentSum = -2`, `maxSum = -2`
2. **Iteration**:
   - At `1`: `currentSum = max(1, -2 + 1) = 1`; `maxSum = max(-2, 1) = 1`
   - At `-3`: `currentSum = max(-3, 1 - 3) = -2`; `maxSum = max(1, -2) = 1`
   - At `4`: `currentSum = max(4, -2 + 4) = 4`; `maxSum = max(1, 4) = 4`
   - At `-1`: `currentSum = max(-1, 4 - 1) = 3`; `maxSum = max(4, 3) = 4`
   - At `2`: `currentSum = max(2, 3 + 2) = 5`; `maxSum = max(4, 5) = 5`
   - At `1`: `currentSum = max(1, 5 + 1) = 6`; `maxSum = max(5, 6) = 6`
   - At `-5`: `currentSum = max(-5, 6 - 5) = 1`; `maxSum = max(6, 1) = 6`
   - At `4`: `currentSum = max(4, 1 + 4) = 5`; `maxSum = max(6, 5) = 6`

The algorithm returns `6`, which is the maximum subarray sum for this array.

#### Variations of Problems Solvable with Kadane’s Algorithm

Kadane’s Algorithm can be adapted for various types of subarray problems, such as:

##### 1. Maximum Sum of Circular Subarray

For a circular array, the maximum subarray might wrap around the end of the array to the beginning. To solve this problem:

- Calculate the maximum subarray sum using Kadane’s algorithm.
- Calculate the total sum of the array, then find the minimum subarray sum (by applying Kadane’s algorithm to the negated values).
- The answer is the maximum of:
  - The maximum subarray sum (standard Kadane’s).
  - The total sum minus the minimum subarray sum (indicating a wrap-around).

##### 2. Maximum Product Subarray

For arrays that seek the maximum product rather than the maximum sum, a modified version of Kadane’s Algorithm is used:

- Track both `currentMax` and `currentMin` values at each step, as multiplying by a negative value can turn the smallest product into the largest.

##### 3. Longest Subarray with a Target Sum (Modified Kadane’s)

This variant requires finding the longest subarray that meets a specific sum rather than the maximum sum. By keeping track of prefix sums and using a hash map, this variant finds the longest sequence with the desired sum.

#### Common Pitfalls to Avoid

1. **Negative Values in Array**: Kadane’s Algorithm works even with negative values, but if all values are negative, the result will be the least negative number.
2. **Array Length of One**: Ensure that the algorithm initializes correctly with a single-element array.
3. **Handling Wrap-Arounds in Circular Arrays**: Be mindful of variations involving circular arrays, as they require modifications to the standard approach.

> **📌 Practical Tip**: Kadane’s Algorithm provides a solid foundation for maximum subarray problems, and understanding its variations allows you to adapt it to a range of problems efficiently.

#### Example Problem: Maximum Product Subarray

```javascript
function maxProduct(nums) {
  let currentMax = nums[0];
  let currentMin = nums[0];
  let maxProduct = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Store currentMax to use in calculating currentMin
    let temp = currentMax;
    currentMax = Math.max(nums[i], nums[i] * currentMax, nums[i] * currentMin);
    currentMin = Math.min(nums[i], nums[i] * temp, nums[i] * currentMin);

    // Update the maximum product found so far
    maxProduct = Math.max(maxProduct, currentMax);
  }

  return maxProduct;
}
```

This problem finds the maximum product of a contiguous subarray, demonstrating Kadane’s logic in cases where both minimum and maximum tracking are needed.

### Summary

Kadane’s Algorithm is a powerful and versatile tool for subarray problems, with extensions that make it adaptable to various situations beyond maximum sums. Whether you’re looking to optimize subarray sums, manage circular arrays, or tackle product-based subarray problems, understanding Kadane’s Algorithm and its variations will provide efficient and effective solutions.
