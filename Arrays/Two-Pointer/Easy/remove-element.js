/**
 * Question: https://leetcode.com/problems/remove-element/
 * Clarifying Questions:
 * 1. How would we handle an empty array?
 *
 * Initial Analysis
 * Naive Approach
 * Create a variable "count" & initialize its value as 0.
 * Iterate over the input array using nested loops.
 * Let "i" be the iterator of the first loop and "j" be the iterator of the second loop.
 * Both "i", "j" starts from the index 1 less than the length of array and moves till the array start (0-th index).
 *  - Check if j-th element is equal to value:
 *    - If "true":
 *      - Replace j-th element with i-th element.
 *      - Replace i-th element with "_".
 *      - Increment count by 1
 * Return the difference of length of the input array & "count".
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 * Optimal Approach
 * Pattern Recognition: Two Pointers (Same Directional Pointers)
 * Reason: Problem involves "partitioning array based on condition"
 * Create two variables left, right and initialize their value as length of the input array - 1.
 * While left is greater than or equal to zero:
 *  - Check if element at left pointer is equal to value:
 *    - if "true":
 *      - Replace element at left with element at right.
 *      - Replace element at right with "_".
 *      - Decrement right by 1.
 *  - Decrement left by 1.
 * Return right incremented by 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
*/

const removeElementNaive = (nums, val) => {
  let count = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = nums.length - 1; j >= 0; j--) {
      if (nums[j] === val) {
        nums[j] = nums[i];
        nums[i] = '_';
        count += 1;
        break;
      }
    }
  }

  return nums.length - count;
};

const removeElement = (nums, val) => {
  let left = nums.length - 1,
      right = nums.length - 1;

  while (left >= 0) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      nums[right] = '_';
      right -= 1;
    }
    left -= 1;
  }

  return right + 1;
};

const assertions = [
  {
      inputs: [[3, 2, 2, 3], 3],
      outputs: [2]
  },
  {
      inputs: [[0, 1, 2, 2, 3, 0, 4, 2], 2],
      outputs: [5]
  },
  {
      inputs: [[], 1],
      outputs: [0]
  },
  {
      inputs: [[1], 1],
      outputs: [0]
  },
  {
      inputs: [[2], 1],
      outputs: [1]
  }
];

const test = (solution, assertions) => {
  for (const {inputs, outputs} of structuredClone(assertions)) {
    const result = solution(...inputs);
    const passed = outputs.some((output) => JSON.stringify(output) === JSON.stringify(result));
    console.log(`${passed ? "✅ Passed" : "❌ Failed"}`)
  }
};

test(removeElementNaive, assertions);
test(removeElement, assertions);

