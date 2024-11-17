/**
 * Question: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * Clarifying Questions:
 * Are we optimizing this problem for time or space complexity?
 *
 * Initial Analysis
 * Naive Approach
 * Create a variable "count" and initialize its value as 0.
 * Using nested loops iterate over the inputs array.
 * Let "i" be the iterator of the outer array and "j" be the iterator of the inner array, where "i" moves from 0 to 1 less than length of the array & "j" moves from i + 1 to length of the array.
 * Inside the inner most loop:
 *  - Check if the i-th element is same as (i + 1)-th element:
 *    - if "true" continue
 *  - Check if the i-th element is less than j-th element .
 *    - if "true" :
 *      - assign i + 1 - th element as j-th element.
 *      - increment "count" by 1.
 *      - break the inner loop.
 * Return "count"
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 *
 * Optimal Approach
 * Pattern Recognition: Two Pointers (Same Directional Pointers)
 * Reason: Problem involves "partitioning the array based on condition"
 * Create variables "left" and initialize its values as 0.
 * Iterate over the inputs array using "right" as iterator, as right moves from "left" + 1 to the length of the array.
 *  - Check if element at left is less than element at right:
 *    - if "true":
 *        - Assign right elements value to left + 1-th element.
 *        - Increment left by 1.
 * Return left + 1
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 */

const removeDuplicatesNaive = (nums) => {
  if (nums.length === 0) return 0;

  let count = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      // Avoiding duplicates of "i"
      if (nums[i] === nums[i + 1]) continue;

      if (nums[i] < nums[j]) {
        nums[i + 1] = nums[j];
        count += 1;
        break;
      }
    }
  }

  return count;
};

const removeDuplicates = (nums) => {
  let left = 0;

  if (nums.length === 0) return left;

  for (let right = left + 1; right < nums.length; right++) {
    if (nums[left] < nums[right]) {
      nums[left + 1] = nums[right];
      left += 1;
    }
  }

  return left + 1;
};

const assertions = [
  // Basic cases
  {
    inputs: [[1, 1, 2]],
    outputs: [2],
  },
  {
    inputs: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]],
    outputs: [5],
  },

  // Edge cases
  {
    inputs: [[]],
    outputs: [0],
    description: "Empty array",
  },
  {
    inputs: [[1]],
    outputs: [1],
    description: "Single element",
  },
  {
    inputs: [[1, 1, 1, 1, 1]],
    outputs: [1],
    description: "All elements same",
  },

  // Boundary cases
  {
    inputs: [[-100, -100, -99, -99, -98, -97, -97]],
    outputs: [4],
  },
  {
    inputs: [
      [
        Number.MIN_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        0,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
      ],
    ],
    outputs: [3],
  },

  // No duplicates
  {
    inputs: [[1, 2, 3, 4, 5]],
    outputs: [5],
  },

  // Alternating duplicates
  {
    inputs: [[1, 1, 2, 2, 3, 3, 4, 4]],
    outputs: [4],
  },

  // Large gaps between numbers
  {
    inputs: [[1, 1, 100, 100, 1000, 1000, 10000]],
    outputs: [4],
  },
];

const test = (solution, assertions) => {
  for (const { inputs, outputs } of structuredClone(assertions)) {
    const result = solution(...inputs);
    const passed = outputs.some(
      (output) => JSON.stringify(output) === JSON.stringify(result)
    );
    console.log(`${passed ? "✅ Passed" : "❌ Failed"}`);
  }
};

test(removeDuplicatesNaive, assertions);
test(removeDuplicates, assertions);
