/**
 * Question: https://leetcode.com/problems/container-with-most-water/
 * Clarifying Questions:
 * 1. What if the length of input height array is less than 2?
 *
 * Naive Approach
 * Create a variable "maxArea" and initialize its value as 0.
 * Iterate over the input array using nested loops.
 * Let "i" be the iterator of the outer loop & "j" be the iterator of the inner loop.
 * Here "i" moves from 0 to 1 less than length of the array and "j" moves from i + 1 to the length of the array.
 *  - Inside the inner loop
 *    - Create a variable "currHeight" and assign it the min of i-th element & j-th element.
 *    - Create a variable "currWidth" and assign it the difference of j & i.
 *    - Create a variable "currArea" and assign it the product of "currWidth" & "currHeight".
 *    - Update "maxArea" with the maximum value between "currArea" & "maxArea".
 * Return "maxArea".
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 * Optimal Approach
 * Pattern Recognition: Two Pointers (Opposite Directional Pointers)
 * Reason: Problem involves "comparing elements from opposite sides"
 * Create a variable "maxArea" and initialize its value as 0.
 * Create two variables "left", "right" and initialize their values as 0 & height.length - 1 respectively.
 * While left is less than right:
 *  - Create a variable "currHeight" and assign it the minimum of left & right element.
 *  - Create a variable "currWidth" and assign it the difference of right - left.
 *  - Create a variable "currArea" and assign it the product of "currWidth" & "currHeight".
 *  - Update "maxArea" with the maximum value between "currArea" & "maxArea".
 *  - Check if left element is less than right element:
 *    - if "true":
 *        - Increment left by 1
 *    - if "false":
 *        - Decrement right by 1
 * Return "maxArea".
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 */

const containerWithMostWaterNaive = (height) => {
  let maxArea = 0;

  if (height.length < 2) return maxArea;

  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const currHeight = Math.min(height[i], height[j]);
      const currWidth = j - i;
      const currArea = currWidth * currHeight;
      maxArea = Math.max(currArea, maxArea);
    }
  }

  return maxArea;
};

const containerWithMostWater = (height) => {
  let maxArea = 0;

  if (height.length < 2) return maxArea;

  let left = 0,
    right = height.length - 1;

  while (left < right) {
    const currHeight = Math.min(height[left], height[right]);
    const currWidth = right - left;
    const currArea = currHeight * currWidth;
    maxArea = Math.max(currArea, maxArea);

    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return maxArea;
};

const assertions = [
  {
    inputs: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
    outputs: [49],
  },
  {
    inputs: [[1, 1]],
    outputs: [1],
  },
  {
    inputs: [[4, 3, 2, 1, 4]],
    outputs: [16],
  },
  {
    inputs: [[1, 2, 1]],
    outputs: [2],
  },
  {
    inputs: [[0, 0]],
    outputs: [0],
  },
  {
    inputs: [[1, 8, 6, 2, 5, 4, 8, 3, 7, 9]],
    outputs: [64],
  },
  {
    inputs: [[2, 3, 4, 5, 18, 17, 6]],
    outputs: [17],
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

test(containerWithMostWaterNaive, assertions);
test(containerWithMostWater, assertions);
