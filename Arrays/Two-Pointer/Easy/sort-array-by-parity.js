/**
 * Question: https://leetcode.com/problems/sort-array-by-parity/
 * Clarifying Questions:
 * 1. What happens if the array is empty?
 * 2. What happens if the array contains only odd numbers?
 *
 * Initial Analysis
 * Naive Approach:
 * Create two empty arrays "odd" & "even"
 * Iterate over the input array with i as iterator
 *     Check if nums[i] % 2 is equal to 0
 *     If "true" push the element to even array
 *     If "false" push the element to odd array
 * Return by concatenating odd and even array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Optimal Solution
 * Pattern Recognition: Two Pointer (Same Directional Pointers)
 * Reason: The questions contains "Partitioning array based on certain conditions"
 * Create a variable called slow and initialize its value to 0
 * Iterate over the array using "fast" as the iterator from 0 to nums.length
 *   Check if nums[slow] is even (nums[slow] % 2 === 0)
 *   If "false" swap element at slow pointer with element at fast pointer
 *  Increment slow pointer.
 * Return nums.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const sortArrayByParityNaive = (nums) => {
  if (nums.length < 2) return nums;

  const even = [];
  const odd = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) even.push(nums[i]);
    else odd.push(nums[i]);
  }

  return [...even, ...odd];
};

const sortArrayByParity = (nums) => {
  if (nums.length < 2) return nums;

  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] % 2 === 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }

  return nums;
};

const assertions = [
  {
    inputs: [[3, 1, 2, 4]],
    outputs: [
      [2, 4, 1, 3],
      [4, 2, 3, 1],
      [4, 2, 1, 3],
      [2, 4, 3, 1],
    ],
  },
  {
    inputs: [[]],
    outputs: [[]],
  },
  {
    inputs: [[2]],
    outputs: [[2]],
  },
  {
    inputs: [[3]],
    outputs: [[3]],
  },
  {
    inputs: [[2, 4, 6]],
    outputs: [
      [2, 4, 6],
      [4, 2, 6],
      [6, 2, 4],
      [6, 4, 2],
      [4, 6, 2],
      [2, 6, 4],
    ],
  },
  {
    inputs: [[1, 3, 5]],
    outputs: [[1, 3, 5]],
  },
  {
    inputs: [[5, 2, 8, 1]],
    outputs: [[2, 8, 5, 1]],
  },
  {
    inputs: [[-3, -2, -4, -1]],
    outputs: [
      [-2, -4, -1, -3],
      [-4, -2, -3, -1],
      [-4, -2, -1, -3],
      [-2, -4, -3, -1],
    ],
  },
  {
    inputs: [[2, 3, 2, 3]],
    outputs: [[2, 2, 3, 3]],
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

test(sortArrayByParityNaive, assertions);
test(sortArrayByParity, assertions);
