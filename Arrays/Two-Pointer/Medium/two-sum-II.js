/**
 * Question: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 * Clarifying Questions
 * 1. What if no pair is found?
 * 2. What if the array is empty?
 * 3. What if the array has just one element?
 *
 * Initial Analysis
 * Naive Approach
 * Create two nested For loops with i, j as their iterators
 * i starts from 0 and goes till nums.length
 * j starts from i + 1 and goes till nums.length
 * Inside the inner most loop:
 *  - Check if sum of nums[i] & nums[j] is target
 *    - if "true" return an array with i + 1, j + 1 in it
 * Return Empty Array
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 * Optimal Approach
 * Pattern Recognition: Two Pointers (Opposite Directional Pointers)
 * Reason: questions involves finding a pair that satisfies a condition (sum === target)
 * Create two variables left, right and initialize them to 0 and nums.length - 1 respectively
 * while left is less than right:
 *  - Find the sum of nums[left] & nums[right] and assign them to a variable sum
 *  - Check if the sum is equal to the target
 *    - if "true" return an Array with left + 1 & right + 1 inside
 *  - Check if the sum is less than the target
 *    - if "true" increment left by 1
 *  - Check if the sum is greater than the target
 *    - if "true" increment right by 1
 * return Empty Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const twoSumIINaive = (nums, target) => {
  if (nums.length < 2) return [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const sum = nums[i] + nums[j];
      if (sum === target) return [i + 1, j + 1];
    }
  }

  return [];
};

const twoSumII = (nums, target) => {
  if (nums.length < 2) return [];

  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum < target) left++;
    if (sum > target) right--;
    if (sum === target) return [left + 1, right + 1];
  }

  return [];
};

const assertions = [
  // Basic test case with a valid pair
  {
    inputs: [[2, 7, 11, 15], 9],
    outputs: [[1, 2]],
  },

  // Test case with multiple pairs
  {
    inputs: [[1, 2, 3, 4, 5], 5],
    outputs: [[1, 4]],
  },

  // Test case where the target is the sum of the first and last elements
  {
    inputs: [[1, 3, 4, 5, 6], 7],
    outputs: [[1, 5]],
  },

  // Test case with negative numbers
  {
    inputs: [[-3, -1, 0, 2], -1],
    outputs: [[1, 4]],
  },

  // Test case with duplicate numbers
  {
    inputs: [[3, 3], 6],
    outputs: [[1, 2]],
  },

  // Edge case with an empty array
  {
    inputs: [[], 5],
    outputs: [[]], // No pairs can be formed
  },

  // Edge case with one element
  {
    inputs: [[10], 10],
    outputs: [[]], // No pairs can be formed
  },

  // Edge case where no valid pairs exist
  {
    inputs: [[1, 2, 3], 7],
    outputs: [[]], // No pairs sum to target
  },

  // Test case with large numbers
  {
    inputs: [[1000000, -1000000], 0],
    outputs: [[1, 2]], //1000000 + (-1000000) =0 , indices are (1 ,2)
  },
];

const test = (solution, assertions) => {
  for (const { inputs, outputs } of JSON.parse(JSON.stringify(assertions))) {
    const result = solution(...inputs);
    const passed = outputs.some(
      (output) => JSON.stringify(output) === JSON.stringify(result)
    );
    console.log(`${passed ? "✅ Passed" : "❌ Failed"}`);
  }
};

test(twoSumIINaive, assertions);
test(twoSumII, assertions);
