# Mock Interview: Algorithm Comparison Example

## Problem: Finding a Pair Sum

**Interviewer**: "Given an array of integers and a target sum, write a function to determine if there exists a pair of numbers in the array that add up to the target. For example, in array [4, 2, 6, 8, 3, 1] with target 10, we should return true because 4 + 6 = 10."

**Candidate**: "Thank you for the problem. Before I dive into solutions, may I ask a few clarifying questions?"

**Interviewer**: "Of course, go ahead!"

**Candidate**: "Great! Let me ask:

1. Can the array contain duplicate numbers?
2. Can we assume the array is not sorted?
3. Do we need to return the indices or just true/false?
4. What should we return if no pair exists?"

**Interviewer**: "Good questions! The array might contain duplicates, it's not sorted, we just need true/false, and return false if no pair exists."

**Candidate**: "Perfect! Let me walk through different approaches following a systematic comparison framework.

### Approach 1: Brute Force with Nested Loops

Let me start with the simplest solution:

```javascript
function findPairSumBrute(arr, target) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] + arr[j] === target) {
        return true;
      }
    }
  }
  return false;
}
```

This approach:

- Time Complexity: O(n²) - two nested loops
- Space Complexity: O(1) - constant extra space
- Advantages: Simple to implement, no extra space needed
- Disadvantages: Quadratic time complexity, not efficient for large arrays

### Approach 2: Sorting-Based Solution

Here's another approach using sorting:

```javascript
function findPairSumSorted(arr, target) {
  // Create a copy to avoid modifying original array
  const sortedArr = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = sortedArr.length - 1;

  while (left < right) {
    const currentSum = sortedArr[left] + sortedArr[right];
    if (currentSum === target) {
      return true;
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }
  return false;
}
```

This solution:

- Time Complexity: O(n log n) due to sorting
- Space Complexity: O(1) if we can modify input, O(n) if we need to copy
- Advantages: Better than brute force for large inputs
- Disadvantages: Modifies or copies input array, still not optimal

### Approach 3: Hash Set Solution

And finally, here's what I think is the optimal solution:

```javascript
function findPairSumHash(arr, target) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(target - num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}
```

This solution:

- Time Complexity: O(n) - single pass through array
- Space Complexity: O(n) - for the hash set
- Advantages: Optimal time complexity, maintains original array order
- Disadvantages: Uses extra space

### Comparison and Recommendation

Let me compare these approaches systematically:

1. Time Efficiency:

   - Brute Force: O(n²)
   - Sorting: O(n log n)
   - Hash Set: O(n)

2. Space Efficiency:

   - Brute Force: O(1)
   - Sorting: O(1) or O(n)
   - Hash Set: O(n)

3. Implementation Complexity:
   - Brute Force: Very simple
   - Sorting: Moderate
   - Hash Set: Simple

For this specific problem, I recommend the Hash Set solution because:

1. It provides optimal time complexity O(n)
2. The space trade-off is acceptable for most real-world scenarios
3. It preserves the original array order
4. It's simple to implement and maintain"

**Interviewer**: "What if memory is very limited and the array is relatively small?"

**Candidate**: "Ah, excellent point! In that case, we should reconsider our choice. For small arrays with tight memory constraints, the brute force solution might actually be more practical:

1. Small arrays: The O(n²) complexity is less impactful
2. Zero extra space needed
3. CPU cache-friendly due to sequential access
4. Simpler code means fewer potential bugs

Would you like me to elaborate on any of these approaches or discuss other trade-offs?"

**Interviewer**: "What about very large arrays with lots of duplicates?"

**Candidate**: "Great question! With many duplicates, we could potentially optimize the hash set solution:

```javascript
function findPairSumHashOptimized(arr, target) {
  const seen = new Set();
  const values = new Set();

  for (const num of arr) {
    // Skip duplicates we've already processed
    if (values.has(num)) continue;

    if (seen.has(target - num)) {
      return true;
    }
    seen.add(num);
    values.add(num);
  }
  return false;
}
```

This optimization:

1. Reduces space usage when there are many duplicates
2. Still maintains O(n) time complexity
3. Might improve performance by reducing hash operations
4. Trade-off: Two sets instead of one, but with potentially fewer elements"

**Interviewer**: "Good! Last question: How would you test these implementations?"

**Candidate**: "I would create test cases covering:

1. Edge cases:

   - Empty array
   - Single element array
   - Array with all same numbers
   - Target sum that's not possible

2. Regular cases:
   - Small arrays (2-3 elements)
   - Medium arrays
   - Arrays with/without valid pairs
   - Arrays with duplicates

Here's a quick test suite:

```javascript
function testPairSum() {
  // Test suite object with descriptive names
  const tests = {
    emptyArray: {
      arr: [],
      target: 10,
      expected: false,
    },
    singleElement: {
      arr: [5],
      target: 10,
      expected: false,
    },
    validPair: {
      arr: [2, 8],
      target: 10,
      expected: true,
    },
    withDuplicates: {
      arr: [1, 1, 1],
      target: 2,
      expected: true,
    },
    noValidPair: {
      arr: [1, 2, 3, 4],
      target: 8,
      expected: false,
    },
    allSameNumbers: {
      arr: [4, 4, 4, 4],
      target: 8,
      expected: true,
    },
  };

  // Run tests
  Object.entries(tests).forEach(([testName, { arr, target, expected }]) => {
    const result = findPairSumHash(arr, target);
    console.assert(
      result === expected,
      `Test "${testName}" failed: expected ${expected}, got ${result}`
    );
    console.log(
      `Test "${testName}": ${result === expected ? "PASSED" : "FAILED"}`
    );
  });
}

// Run the test suite
testPairSum();
```

Would you like me to elaborate on any of these points?"

## Key Takeaways from this Mock Interview:

1. Started with clarifying questions
2. Presented multiple solutions systematically
3. Analyzed trade-offs comprehensively
4. Adapted recommendations based on constraints
5. Demonstrated testing knowledge
6. Maintained clear communication throughout

## Steps to Achieve Each Takeaway

1. **Clarifying Questions**

   - Write down common edge cases beforehand
   - Use the [STAR method](./star-technique-for-clarifying-questions.md) (Situation, Task, Action, Result)
   - Group questions logically
   - Wait for answers before proceeding

2. **Multiple Solutions**

   - Start with brute force
   - Explain trade-offs clearly
   - Use consistent analysis format
   - Show progressive optimization

3. **Handling Constraints**

   - Consider different scenarios
   - Prepare optimized versions
   - Explain trade-offs
   - Show adaptability

4. **Code Quality**

   - Use clear variable names
   - Add comments for clarity
   - Follow JavaScript best practices
   - Consider performance

5. **Testing**

   - Cover edge cases
   - Test normal cases
   - Use descriptive test names
   - Show systematic approach

6. **Code Organization**

   - Clear function names
   - Consistent coding style
   - Modular approach
   - Easy to maintain

7. **Communication**

   - Clear explanations
   - Structured responses
   - Active listening
   - Professional terminology

8. **JavaScript Specifics**
   - Use of modern features (Set, spread operator)
   - Proper array handling
   - Efficient data structures
   - Clean syntax
