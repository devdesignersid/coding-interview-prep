/**
 * Question: https://leetcode.com/problems/move-zeroes/
 * Clarifying Questions:
 * 1. What should be the o/p if the array only contains non-zero elements?
 * 2. What should be the o/p if the array only contains zeros?
 * 3. What should be the o/p if the array is empty?
 * 4. What are we optimizing for, "Space" or "Time" complexity?
 *
 * Initial Analysis
 * Naive Approach
 * Create two variables nonZeros & zeros and initialize them with empty arrays.
 * Iterate over the input array
 *  - if the element at the current index is zero, push it to the zeros array.
 *  - if not push it to the the nonZeros array
 * Return  concatenation of zeros with nonZeros array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Optimal Solution
 * Pattern Recognition: Two Pointer (Same Directional Pointers)
 * Reason: The questions contains "Partitioning array based on certain conditions"
 * Create a variable slow and initialize its value as 0.
 * Iterate over the input array using an iterator "fast" where fast moves from 0 to length of the array.
 *  - if element at slow pointer is zero and element at fast pointer is non-zero swap the elements and increment slow by 1 else continue.
 * Return the input array.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const moveZerosNaive = (nums) => {
  const [zeros, nonZeros] = [[], []];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) zeros.push(nums[i]);
    else nonZeros.push(nums[i]);
  }

  return nonZeros.concat(zeros);
};

const moveZeros = (nums) => {
  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[slow] === 0 && nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow += 1;
    }
  }
  return nums;
};

const assertions = [
  {
    inputs: [[0, 1, 0, 3, 12]],
    outputs: [[1, 3, 12, 0, 0]],
  },
  {
    inputs: [[0]],
    outputs: [[0]],
  },
  {
    inputs: [[1]],
    outputs: [[1]],
  },
  {
    inputs: [[1, 0]],
    outputs: [[1, 0]],
  },
  {
    inputs: [[1, 2, 3, 4, 5]],
    outputs: [[1, 2, 3, 4, 5]],
  },
  {
    inputs: [[0, 0, 0, 0, 1]],
    outputs: [[1, 0, 0, 0, 0]],
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

test(moveZerosNaive, assertions);
test(moveZeros, assertions);
