/**
 * Question: https://leetcode.com/problems/4sum/
 * Clarifying Questions:
 * 1. How would we handle input arrays with length less than 4?
 * 2. How would we handle an empty input array?
 *
 * Naive Approach
 * Create a variable called "result" and initialize its value as an empty array (the size of this array would be nC4).
 * Sort the input array in ascending order.
 * Using four nested loops iterate over the input array.
 * Let "h", "i", "j" & "k" be the iterators of each of those arrays respectively.
 * "h" starts from 0 and move till 3 less than length of the array.
 * "i" starts from "h" + 1 and move till 2 less than length of the array.
 * "j" starts from "i" + 1 and moves till 1 less than length of the array.
 * "k" starts from "j" + 1 and moves till the length of the array.
 * Inside the first loop:
 *  - Check if "h" is greater than 0 and "h" is equal to "h" - 1 :
 *    - if "true" then continue the loop
 *  - Inside the second loop:
 *    - Check if "i" is greater than "h" and "i" is equal to "i" - 1 :
 *      - if "true" then continue the loop
 *    - Inside the third loop:
 *      - Check if "j" is greater than "i" and "j" is equal to "j" - 1 :
 *        - if "true" then continue the loop
 *      - Inside the fourth loop:
 *        - Check if "k" is greater than "j" and "k" is equal to "k" - 1 :
 *          - if "true" then continue the loop
 *        - Check if the sum of element at "h",  elemen at "i", element at "j" & element at "k" is equal to target :
 *          - if "true" then push the array containing element at "h", "i", "j" & "k" into the result array.
 * Return the "result" array
 * Time Complexity: O(n^4)
 * Space Complexity: O(n)
 *
 * Optimal Approach
 * Pattern Recognition: Two Poitners (Opposite Direction) + Sorting
 * Create a variable called "result" and initialize its value as an empty array (the size of this array would be nC4).
 * Sort the input array in ascending order.
 * Using two nested loops iterate over the input array.
 * Let "h" &  "i" be the iterators of each of those arrays respectively.
 * "h" starts from 0 and move till 3 less than length of the array.
 * "i" starts from "h" + 1 and move till 2 less than length of the array.
 * Inside the first loop:
 *  - Check if "h" is greater than 0 and "h" is equal to "h" - 1 :
 *    - if "true" then continue the loop
 *  - Inside the second loop:
 *    - Check if "i" is greater than "h" and "i" is equal to "i" - 1 :
 *      - if "true" then continue the loop
 *    - Create two variables left & right and initialize their value as i + 1 & nums.length respectively.
 *    - While left is less than right:
 *      - Check if the sum of the left & right element is equal to target:
 *        - if "true" then push the array containing element at "h", "i", "left" & "right" into the result array.
 *        - while left < right & element at left is equal to element at left - 1 then increment left by 1.
 *        - while left < right & element at right is equal to element at right + 1 then decrement right by 1.
 * Return the "result" array
 * Time Complexity: O(n^3)
 * Space Complexity: O(n)
 *
 */

const fourSumNaive = (nums, target) => {
  const result = new Array();

  if (nums.length < 4) return result;

  nums.sort((a, b) => a - b);

  for (let h = 0; h < nums.length - 3; h++) {
    if (h > 0 && nums[h] === nums[h - 1]) continue;

    for (let i = h + 1; i < nums.length - 2; i++) {
      if (i > h + 1 && nums[i] === nums[i - 1]) continue;

      for (let j = i + 1; j < nums.length - 1; j++) {
        if (j > i + 1 && nums[j] === nums[j - 1]) continue;

        for (let k = j + 1; k < nums.length; k++) {
          if (k > j + 1 && nums[k] === nums[k - 1]) continue;

          const sum =
            BigInt(nums[h]) +
            BigInt(nums[i]) +
            BigInt(nums[j]) +
            BigInt(nums[k]);

          if (sum === BigInt(target))
            result.push([nums[h], nums[i], nums[j], nums[k]]);
        }
      }
    }
  }

  return result;
};

const fourSum = (nums, target) => {
  const result = new Array();

  if (nums.length < 4) return result;

  nums.sort((a, b) => a - b);

  for (let h = 0; h < nums.length - 3; h++) {
    if (h > 0 && nums[h] === nums[h - 1]) continue;

    for (let i = h + 1; i < nums.length - 2; i++) {
      if (i > h + 1 && nums[i] === nums[i - 1]) continue;

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[h] + nums[i] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[h], nums[i], nums[left], nums[right]]);

          while (left < right && nums[left] === nums[left - 1]) left += 1;
          while (left < right && nums[right] === nums[right + 1]) right -= 1;

          left += 1;
          right -= 1;
        } else if (sum > target) right -= 1;
        else left += 1;
      }
    }
  }

  return result;
};

const assertions = [
  {
    inputs: [[1, 0, -1, 0, -2, 2], 0],
    outputs: [
      [
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ],
    ],
  },
  {
    inputs: [[2, 2, 2, 2, 2], 8],
    outputs: [[[2, 2, 2, 2]]],
  },
  {
    inputs: [[-3, -2, -1, 0, 1, 2, 3], 0],
    outputs: [
      [
        [-3, -2, 2, 3],
        [-3, -1, 1, 3],
        [-3, 0, 1, 2],
        [-2, -1, 0, 3],
        [-2, -1, 1, 2],
      ],
    ],
  },
  {
    inputs: [[-1, -5, -5, -3, 2, 5, 0, 4], -7],
    outputs: [
      [
        [-5, -5, -1, 4],
        [-5, -3, -1, 2],
      ],
    ],
  },
  {
    inputs: [[], 0], // Empty array
    outputs: [[]],
  },
  {
    inputs: [[1, 2, 3], 6], // Array shorter than 4
    outputs: [[]],
  },
  {
    inputs: [[1000000000, 1000000000, 1000000000, 1000000000], 4000000000], // Overflow case
    outputs: [[[1000000000, 1000000000, 1000000000, 1000000000]]],
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

test(fourSumNaive, assertions);
test(fourSum, assertions);
