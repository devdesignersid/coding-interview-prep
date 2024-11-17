/**
 * Question: https://leetcode.com/problems/sort-colors/
 * Clarifying Questions:
 * 1. Does the input array have three colors always?
 * 2. What if the input array is empty?
 * 3. How to deal with a non-color value in the input array?
 *
 * Initial Analysis:
 * Naive Approach
 * Iterate over the input array using two nested loops.
 * Let "i" be the iterator of the first loop and "j" be the iterator of the second.
 * The "i" should start at 0 and move till length of the array minus one.
 * The "j" should start at i + 1 and move till length of the array.
 * Inside the inner most loop check:
 *  - If i-th element is greater than the j-th element :
 *    - If "true" swap i-th element with j-th element.
 * Return input array.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 *
 * Optimal Solution
 * Pattern Recognition: Two Pointers (Opposite Directions)
 * Reason: Problem involves "Partitioning array based on certain condition (order inside partition not important)"
 * Create three variables left, right & current.
 * Initialize their values as 0, length of array - 1 & 0 respectively
 * While current is less than or equal to right:
 *  - Check if the item at current position is equal to 0
 *    - if "true" increment left & current by 1.
 *  - Check if the item at current position is equal to 1
 *    - if "true" increment current by 1.
 *  - Check if the item at current position is equal to 2
 *    - if "true" decrement right by 1.
 * Return the input array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

const sortColorsNaive = (nums) => {
  if (nums.length < 2) return nums;
  if (nums.some((num) => ![0, 1, 2].includes(num)))
    throw new Error("Invalid color value found!");

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  return nums;
};

const sortColors = (nums) => {
  if (nums.length < 2) return nums;
  if (nums.some((num) => ![0, 1, 2].includes(num)))
    throw new Error("Invalid color value found!");

  let left = 0;
  let right = nums.length - 1;
  let current = 0;

  while (current <= right) {
    if (nums[current] === 0) {
      [nums[left], nums[current]] = [nums[current], nums[left]];
      left += 1;
      current += 1;
    } else if (nums[current] === 1) {
      current += 1;
    } else {
      [nums[right], nums[current]] = [nums[current], nums[right]];
      right -= 1;
    }
  }

  return nums;
};

const assertions = [
  {
    inputs: [[2, 0, 2, 1, 1, 0]],
    outputs: [[0, 0, 1, 1, 2, 2]],
  },
  { inputs: [[]], outputs: [[]] }, // Empty array
  { inputs: [[0]], outputs: [[0]] }, // Single element
  { inputs: [[1, 0]], outputs: [[0, 1]] }, // Two elements
  { inputs: [[2, 2, 1, 1, 0, 0]], outputs: [[0, 0, 1, 1, 2, 2]] }, // All colors equal count
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

test(sortColorsNaive, assertions);
test(sortColors, assertions);
