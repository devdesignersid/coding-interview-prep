/**
 * Question: https://leetcode.com/problems/merge-sorted-array/
 * Clarifying Questions
 * 1. What if the length of the first array is not equal to sum of m & n?
 * 2. What if the number of elements (n) in the second array is greater than the length of the first array?
 * 3. What if the length of the second array is less than the difference of length of first array and m
 *
 *
 * Initial Analysis
 * Naive Approach
 * Using a for loop, copy the (i)-th elements from the second array to the first array's (m + i)-th index where i is the iterator and i goes from 0 to n.
 * Sort the first array in ascending order.
 * Return the first array.
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 *
 * Optimal Approach
 * Pattern Recognition: Two Pointers
 * Create three variables "first", "second", & "writeIdx".
 * Initialize their values as m - 1, n - 1 & m + n - 1 respectively.
 * Where m is the number of element of first array, n is the number of elements in the second array.
 * "first" pointer points to the index in first array whereas "second" pointer points to the index in second array.
 * While n is greater than or equal to 0
 *  - Check if element at "first" pointer is greater than element at "second" pointer
 *    - if "true":
 *      - Then write the element at "first" pointer to the location of "writeIdx".
 *    - Decrement "writeIdx".
 *    - Decrement "first" pointer.
 *  - Check if element at "first" pointer is less than element at "second" pointer
 *    - if "true"
 *      - Then write the element at "second" pointer to the location of "writeIdx"
 *      - Decrement "writeIdx"
 *      - Decrement "second" pointer
 *  - Check if element at "first" pointer is equal to the element at "second" pointer
 *    - if "true":
 *      - Then write the element at "second" or "first" pointer to the location of "writeIdx"
 *      - Decrement "second" pointer
 *      - Decrement "first" pointer
 *
 * Return the first array.
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */

const mergeSortedArraysNaive = (firstArr, m, secondArr, n) => {
  if (firstArr.length < m || firstArr.length < m + n) {
    throw Error('Invalid value for "m"');
  }
  if (secondArr.length < n || firstArr.length < n)
    throw Error('Invalid value for "n"');

  for (let i = 0; i < n; i++) {
    firstArr[m + i] = secondArr[i];
  }

  firstArr.sort((a, b) => a - b);
  return firstArr;
};

const mergeSortedArrays = (firstArr, m, secondArr, n) => {
  if (firstArr.length < m || firstArr.length < m + n) {
    throw Error('Invalid value for "m"');
  }

  if (secondArr.length < n || firstArr.length < n)
    throw Error('Invalid value for "n"');

  let first = m - 1,
    second = n - 1,
    writeIdx = m + n - 1;

  while (second >= 0) {
    const firstElement = firstArr[first];
    const secondElement = secondArr[second];

    if (firstElement > secondElement) {
      firstArr[writeIdx] = firstElement;
      first -= 1;
    } else if (firstElement < secondElement) {
      firstArr[writeIdx] = secondElement;
      second -= 1;
    } else {
      firstArr[writeIdx] = secondElement;
      first -= 1;
      second -= 1;
    }
    writeIdx -= 1;
  }

  return firstArr;
};

const assertions = [
  {
    inputs: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
    outputs: [[1, 2, 2, 3, 5, 6]],
  },
  {
    inputs: [[0, 0, 0, 0, 0], 0, [1, 2, 3, 4, 5], 5],
    outputs: [[1, 2, 3, 4, 5]],
  },
  {
    inputs: [[1, 2, 3, 4, 5], 5, [], 0],
    outputs: [[1, 2, 3, 4, 5]],
  },
  {
    inputs: [[1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3],
    outputs: [[1, 2, 3, 4, 5, 6]],
  },
  {
    inputs: [[1, 3, 5, 0, 0, 0], 3, [2, 4, 6], 3],
    outputs: [[1, 2, 3, 4, 5, 6]],
  },
  {
    inputs: [[1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3],
    outputs: [[1, 2, 3, 4, 5, 6]],
  },
  /* Test Cases for Error
    {
      inputs: [[1, 2, 3, 0, 0, 0], 3, [4, 5, 6, 7, 8], 5],
      outputs: [new Error('invalid value for "m"')]
    },
    {
      inputs: [[], 0, [1, 2, 3], 3],
      outputs: [new Error('invalid value for "m"')]
    },
    {
      inputs: [[1, 2, 3, 4, 5], 5, [6, 7, 8], 3],
      outputs: [new Error('invalid value for "m"')]
    },
    */
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

test(mergeSortedArraysNaive, assertions);
test(mergeSortedArrays, assertions);
