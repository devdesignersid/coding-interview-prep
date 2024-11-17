/**
 * Question: https://leetcode.com/problems/squares-of-a-sorted-array/
 * Clarifying Questions:
 * 1. How do i deal with an input array that contains one or no elements?
 * 2. What are we optimizing for: Time Complexity or Space Complexity?
 *
 * Initial Analysis:
 * Naive Approach:
 * Iterate over the input array using two nested loops with "i" & "j" as their iterators.
 * "i" starts from 0 and goes till nums.length
 * "j" starts from i + 1 and goes till nums.length
 * Inside the inner loop check if:
 *  - i-th element is greater than j-th element
 *    - if "true" swap i-th element with j-th element
 *  - i-th element is square of i-th element
 * return input array
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 *
 * Optimal Approach:
 * Pattern Recognition: Two Pointers (Opposite Direction)
 * Reason: The problem involves comparing elements from the opposite sides.
 * Create 3 variables "left", "right" & "writeIdx"
 * And initialize their values as 0, length of the array - 1 & length of the array - 1 respectively.
 * Create another variable result and initialize its value as an empty array of length as same as that of the input array.
 * While writeIdx is greater than or equal to 0.
 *  - Check if Square of the left element is greater than square of the right element
 *    - if "true" then write the square of the left element to index corresponding to the writeIdx of the result array & increment left by 1
 *    - if "false" then write the square of the right element to index corresponding to the writeIdx of the result array & decrement right by 1
 *    - Decrement writeIdx by 1
 * Return the result array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

const squaresOfASortedArrayNaive = (nums) => {
  if (nums.length === 0) return nums;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const leftSquare = nums[i] * nums[i];
      const rightSquare = nums[j] * nums[j];
      if (leftSquare > rightSquare) [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    nums[i] = nums[i] * nums[i];
  }
  return nums;
};

const squaresOfASortedArray = (nums) => {
  if (nums.length === 0) return nums;

  let left = 0,
    right = nums.length - 1;
  let writeIdx = nums.length - 1;
  const result = new Array(nums.length);

  while (writeIdx >= 0) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[writeIdx] = leftSquare;
      left += 1;
    } else {
      result[writeIdx] = rightSquare;
      right -= 1;
    }

    writeIdx -= 1;
  }

  return result;
};

const assertions = [
  // Original test case
  {
    inputs: [[-4, -1, 0, 3, 10]],
    outputs: [[0, 1, 9, 16, 100]],
  },
  // All negative numbers
  {
    inputs: [[-5, -4, -3, -2, -1]],
    outputs: [[1, 4, 9, 16, 25]],
  },
  // All positive numbers
  {
    inputs: [[1, 2, 3, 4, 5]],
    outputs: [[1, 4, 9, 16, 25]],
  },
  // Single element
  {
    inputs: [[5]],
    outputs: [[25]],
  },
  // Empty array
  {
    inputs: [[]],
    outputs: [[]],
  },
  // Two elements
  {
    inputs: [[-2, -2]],
    outputs: [[4, 4]],
  },
  // Numbers that square to same value
  {
    inputs: [[-3, -2, 0, 2, 3]],
    outputs: [[0, 4, 4, 9, 9]],
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

test(squaresOfASortedArrayNaive, assertions);
test(squaresOfASortedArray, assertions);
