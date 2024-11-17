/**
 * Question: https://leetcode.com/problems/3sum/
 * Clarifying Questions:
 * 1. What if the input array has length less than 3?
 * 2. What if the input array is empty?
 * 3. Are duplicates allowed while returning triplets?
 *
 * Initial Analysis
 * Naive Approach
 * Create a variable result and initialize it as an empty array.
 * Sort the input array in ascending order
 * Using three nested loops iterate over the input array with i, j & k as their iterators respectively.
 * For the first loop i should start from 0 and iterate till nums.length - 2
 *  - Check if the num[i] > 0, if true break the loop. This is because as the array is sorted all the consecutive elements will be positive and larger there by eliminating the chance of getting 0 as sum
 *  - Check if i > 0 & nums[i] === nums[i - 1] continue to avoid duplicats at the i-th index;
 *      - For the second loop inside the first j should start from i + 1 and iterate till nums.length - 1
 *        - Check if the sum of nums[j] & nums[i] > 0, if true break the loop
 *        - Check if j > i + 1 & nums[j] === nums[j - 1] continue to avoid duplicates at j-th index;
 *            - For the third loop inside the second k should start from k + 1 and iterate till nums.length
 *              - Check if the sum of nums[i], nums[j] & num[k] is greater than 0 then break the loop
 *              - Check if the k > j + 1 & nums[k] === nums[k - 1] continue to avoid duplicates at k-th index.
 *              - Check if sum of nums[i], nums[j] & nums[k] === 0
 *                - if "true"
 *                    - push array containing nums[i], nums[j], nums[k] to the result array.
 * Return result array
 * Time Complexity: O(n^3)
 * Space Complexity: O(n)
 *
 * Optimal Approach
 * Pattern Recognition: Sorting + Two Pointers (Opposite Directional Pointers)
 * Reason: Problem involves finding the triplet that satisfies the condition
 * Create a variable result and initialize it with an empty array
 * Iterate over the input array with i as the iterator
 * i should move from 0 to nums.length - 2
 *   - Check if the nums[i] > 0 break the loop
 *   - Check if i > 0 & nums[i] === nums[i - 1] then continue
 *   - Create two variables left, right and initialize their values as 0, nums.length - 1 respectively
 *   - while(left < right)
 *      - check if sum of nums[i], nums[left], nums[right] is less than 0
 *        - if true increment left by 1
 *      - check if sum of nums[i], nums[left], nums[right] is greater than 0
 *        - if true decrement right by 1
 *      - check if sum of nums[i], nums[left], nums[right] is equal to 0
 *        - if true
 *            - push an array containing nums[i], nums[j], nums[k] to result array
 *            - while left < right and nums[left] is equal to nums[left + 1] then increment left by 1
 *            - while left < right and nums[right] is equal to nums[right - 1] then decrement right by 1
 *       - increment left by 1
 *       - decrement right by 1
 * Return result array
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 *
 */

const threeSumNaive = (nums) => {
  const result = [];

  if (nums.length < 3) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;

    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < nums.length - 1; j++) {
      if (nums[i] + nums[j] > 0) break;

      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];

        if (sum > 0) break;

        if (k > j + 1 && nums[k] === nums[k - 1]) continue;

        if (sum === 0) result.push([nums[i], nums[j], nums[k]]);
      }
    }
  }

  return result;
};

const threeSum = (nums) => {
  const result = [];

  if (nums.length < 3) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;

    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1,
      right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) right -= 1;

      if (sum < 0) left += 1;

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left += 1;
        while (left < right && nums[right] === nums[right - 1]) right -= 1;

        left += 1;
        right -= 1;
      }
    }
  }

  return result;
};

const assertions = [
  // Basic cases
  {
    inputs: [[-1, 0, 1, 2, -1, -4]],
    outputs: [
      [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    ],
  },
  {
    inputs: [[0, 0, 0]],
    outputs: [[[0, 0, 0]]],
  },
  {
    inputs: [[0, 1, 1]],
    outputs: [[]],
  },

  // Edge cases
  {
    inputs: [[]],
    outputs: [[]],
  },
  {
    inputs: [[1, 2]],
    outputs: [[]],
  },

  // Multiple zeros
  {
    inputs: [[0, 0, 0, 0]],
    outputs: [[[0, 0, 0]]],
  },

  // All negatives
  {
    inputs: [[-5, -4, -3, -2, -1]],
    outputs: [[]],
  },

  // All positives
  {
    inputs: [[1, 2, 3, 4, 5]],
    outputs: [[]],
  },

  // Cases with duplicates
  {
    inputs: [[-2, 0, 0, 2, 2]],
    outputs: [[[-2, 0, 2]]],
  },
  {
    inputs: [[-1, -1, -1, 0, 0, 0, 1, 1, 1]],
    outputs: [
      [
        [-1, 0, 1],
        [0, 0, 0],
      ],
    ],
  },
  {
    inputs: [[-2, -2, -1, -1, 0, 0, 1, 1, 2, 2]],
    outputs: [
      [
        [-2, 0, 2],
        [-2, 1, 1],
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    ],
  },

  // Minimal valid case
  {
    inputs: [[-1, 0, 1]],
    outputs: [[[-1, 0, 1]]],
  },

  // Complex cases with duplicates
  {
    inputs: [[-4, -2, -2, -2, 0, 1, 2, 2]],
    outputs: [
      [
        [-4, 2, 2],
        [-2, 0, 2],
      ],
    ],
  },
  {
    inputs: [[1, -1, -1, 0]],
    outputs: [[[-1, 0, 1]]],
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

test(threeSumNaive, assertions);
test(threeSum, assertions);
