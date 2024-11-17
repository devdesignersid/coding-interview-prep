### Prefix Sum Pattern

The **Prefix Sum Pattern** is a technique that involves precomputing cumulative sums (or other metrics) up to each index in an array. Once we have the prefix sums, we can use them to quickly calculate the sum of any subarray in constant time. This technique is commonly applied to optimize problems with multiple subarray sum queries or when you need to process cumulative data efficiently.

#### When to Use the Prefix Sum Pattern?

Consider using the Prefix Sum Pattern in the following scenarios:

1. **Subarray Sum Queries**: When you need to find the sum of multiple subarrays, prefix sums allow you to get each sum in constant time \( O(1) \).
2. **Range Queries**: Calculating the cumulative sum, product, or other aggregate within a specific range of indices.
3. **Targeted Sums**: Problems where you need to count or identify subarrays with specific properties (e.g., sum equal to or less than a target).
4. **Difference Arrays**: When you need to apply incremental changes over a range of indices (a variant of prefix sums).

> **💡 Interview Tip**: Mentioning that you’re using prefix sums to handle range queries or subarray sums signals to interviewers that you understand how to optimize repeated calculations.

#### How the Prefix Sum Pattern Works

The prefix sum array (or cumulative sum array) is an auxiliary array where each element at index \( i \) contains the sum of all elements from the start of the array up to index \( i \). Given an array `arr`, the prefix sum array `prefix` is defined as:

$$
\text{prefix}[i] = \sum_{j=0}^{i} \text{arr}[j]
$$

With this precomputed, the sum of any subarray from index \( i \) to \( j \) can be found as:

$$
\text{sum}(i, j) = \text{prefix}[j] - \text{prefix}[i-1]
$$

This allows us to calculate subarray sums in constant time \( O(1) \) after an \( O(n) \) preprocessing step to create the prefix sum array.

#### Solution Template for Prefix Sum Pattern

1. **Compute the Prefix Sum Array**: Initialize an array to hold prefix sums, where each entry accumulates the sum of all elements up to that index.
2. **Use Prefix Sum for Range Queries**: For any given subarray or range \( i \) to \( j \), calculate the sum as `prefix[j + 1] - prefix[i]`.

#### Example Problems Using Prefix Sum

##### 1. Subarray Sum Queries

Given an array, efficiently find the sum of any subarray from index \( i \) to \( j \) multiple times.

```javascript
function buildPrefixSum(arr) {
  let prefix = [0];
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  return prefix;
}

function subarraySum(prefix, i, j) {
  return prefix[j + 1] - prefix[i];
}

// Usage Example
const arr = [3, 5, 2, 8, 10];
const prefix = buildPrefixSum(arr);
console.log(subarraySum(prefix, 1, 3)); // Output: 15 (sum of subarray [5, 2, 8])
```

**Explanation**:

- `buildPrefixSum` computes the prefix sum array in \( O(n) \).
- `subarraySum` calculates the sum of any subarray in \( O(1) \) using the prefix sum array.

##### 2. Subarray Sum Equals K

This problem involves finding the number of subarrays with a sum equal to a target \( k \). Using prefix sums with a hash map can reduce this to \( O(n) \) complexity.

```javascript
function subarraySumEqualsK(arr, k) {
  let prefixSum = 0;
  let prefixMap = { 0: 1 }; // Initialize with sum zero count as 1
  let count = 0;

  for (let num of arr) {
    prefixSum += num;
    if (prefixMap[prefixSum - k] !== undefined) {
      count += prefixMap[prefixSum - k];
    }
    prefixMap[prefixSum] = (prefixMap[prefixSum] || 0) + 1;
  }

  return count;
}

// Example
console.log(subarraySumEqualsK([1, 1, 1], 2)); // Output: 2 ([1,1], [1,1])
```

**Explanation**:

- We maintain a running `prefixSum` and use a hash map (`prefixMap`) to store the frequency of each prefix sum encountered.
- For each prefix sum, if `prefixSum - k` exists in the map, it means there’s a subarray with sum \( k \), so we increase the count by the number of times `prefixSum - k` has been seen.

##### 3. Product of Array Except Self (Prefix Product Variant)

While not strictly a prefix sum, this problem follows a similar pattern with **prefix products**.

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  let leftProducts = Array(n).fill(1);
  let rightProducts = Array(n).fill(1);
  let result = Array(n);

  // Calculate prefix products from the left
  for (let i = 1; i < n; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }

  // Calculate prefix products from the right
  for (let i = n - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  // Multiply left and right prefix products for each element
  for (let i = 0; i < n; i++) {
    result[i] = leftProducts[i] * rightProducts[i];
  }

  return result;
}

// Example
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
```

**Explanation**:

- `leftProducts` holds the product of all elements to the left of each index.
- `rightProducts` holds the product of all elements to the right.
- For each index, multiplying `leftProducts[i]` and `rightProducts[i]` gives the product of the array except the element at that index.

The **Product of Array Except Self** problem can indeed be optimized further by using **in-place calculations** to reduce space complexity. Instead of using additional arrays for left and right products, we can use a single output array and calculate the result in two passes. This optimized approach maintains an \( O(n) \) time complexity with \( O(1) \) auxiliary space (excluding the output array).

Here's the improved solution with in-place calculations:

---

### Optimized Solution for Product of Array Except Self

The goal is to compute, for each element in the array, the product of all elements except itself, without using division and with optimal space complexity.

#### Approach

1. **Left Pass**: In the first pass, populate each element in the result array with the product of all elements to the left of that index.
2. **Right Pass**: In the second pass, multiply each element in the result array by the product of all elements to the right of that index.

This way, we only need one output array, which we fill in-place. The space complexity for this solution is reduced to \( O(1) \) (excluding the output array).

#### Code Implementation

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = Array(n).fill(1);

  // Left Pass: Calculate left products in result array
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Right Pass: Calculate right products on the fly and multiply with current result
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i]; // Update right product for the next element to the left
  }

  return result;
}

// Example usage
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24, 12, 8, 6]
```

#### Explanation

1. **Left Pass**: The `result` array holds the cumulative product of elements to the left of each index:

   - `result[0]` is initialized to `1` since there are no elements to the left.
   - For each index \( i \), `result[i]` accumulates the product of all elements up to \( i-1 \).

2. **Right Pass**: Using a `rightProduct` variable, we accumulate the product of elements to the right and update `result[i]` by multiplying it with `rightProduct`:
   - `rightProduct` starts at `1` (since no elements are to the right of the last element initially).
   - For each index \( i \) from the end of the array to the start, `result[i]` is multiplied by `rightProduct`.
   - `rightProduct` is then updated by multiplying it with `nums[i]` as we move leftward.

#### Complexity Analysis

- **Time Complexity**: \( O(n) \), as we traverse the array twice (one pass for left products, one pass for right products).
- **Space Complexity**: \( O(1) \), if we exclude the output array, which is required to store the final result.

### Key Takeaways

- **In-Place Calculation**: By using a single array and two passes, we eliminate the need for extra storage arrays, reducing space complexity.
- **Efficient for Large Arrays**: This approach is optimal for memory-limited environments or cases where minimizing space usage is crucial.

This optimized in-place method is a popular approach in technical interviews and demonstrates your ability to maximize efficiency in both time and space complexity.

---

#### Common Problems Solved Using Prefix Sum

1. **Range Sum Query** - Find the sum of elements in a specific range multiple times efficiently.
2. **Subarray Sum Equals K** - Count subarrays with a sum equal to a specific target \( k \).
3. **Maximum Sum of a Subarray with Length Constraint** - Find the maximum sum of subarrays with a specific or limited length.
4. **Product of Array Except Self** - Find the product of all elements except the current one, using prefix and suffix products.
5. **Count of Range Sum** - Count the number of range sums that lie within a given interval.

#### Key Takeaways

- **Prefix Sum Array**: Useful for constant-time range sum queries after \( O(n) \) preprocessing.
- **Hash Maps with Prefix Sums**: Effective for counting subarrays with specific properties (e.g., sum equals \( k \)) by storing and retrieving prefix sums.
- **Variants with Products and Differences**: Can be extended to handle cumulative products or difference arrays, enabling optimizations in diverse scenarios.

Mastering the Prefix Sum pattern provides a robust foundation for efficiently handling cumulative data and range queries, making it a valuable tool for technical interviews.
