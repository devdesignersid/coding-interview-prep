## Introduction to Complexity Measures

- [ ] [Comparing Algorithms](#comparing-algorithms)
- [ ] [Introduction to Asymptotic Analysis & Big(O)](#introduction-to-asymptotic-analysis-and-big-o)

### Comparing Algorithms

#### Why Algorithm Comparison Matters?

In FAANG interviews, its not enough to just solve the problem. You need to:

1. Demonstrate understanding of trade-offs.
2. Show you can optimize for different scenarios.
3. Prove that you think systematically about performance.

#### Key Comparison Metrics

##### Time Complexity

- Primary metric in most interviews
- Measured in Big O notation
- Tips:
  - Always mention best, average and worst cases
  - Be prepared to mention why your analysis is correct
  - Highlight any assumptions you are making

##### Space Complexity

- **Often overlooked** but equally important
- Includes:
  - Auxiliary space (extra space used)
  - Input space (space needed for input)
- 🚨 Interview Tip: Mentioning space complexity without being prompted impresses interviewers

#### Other Important Factors

1. Readability

   - Clean code matters
   - Should be maintainable
   - Use meaningful variable names

2. Modularity

   - How reusable is your solution?
   - Can it be extended easily?

3. Stability

   - Is the algorithm stable? (Important for sorting)
   - How does it handle the edge cases?

#### Comparison Framework

```
1. Time Complexity Analysis
   └─ Best/Average/Worst cases
2. Space Complexity Analysis
   └─ Auxiliary space needs
3. Trade-offs Discussion
   └─ When to use each approach
4. Real-world Considerations
   └─ Practical implementation issues
```

#### 🌟 Pro Tips for Interviews

##### The "Better Algorithm" Trap

- Don't immediately jump to the most optimized solution
- Start with the brute force approach
- Explain your thought process as you optimize
- Example: "Let's start with a simple solution and then optimize it"

#### Trade-off Discussion Template

```
"We could use [Algorithm A] which gives us [advantages],
but it comes with [disadvantages].
Alternatively, [Algorithm B] offers [different advantages]
at the cost of [different disadvantages].
In this specific case, I'd choose [choice] because [reasoning]."
```

#### Red Flags to Avoid

- ❌ Only mentioning time complexity
- ❌ Forgetting to discuss trade-offs
- ❌ Not considering edge cases
- ❌ Jumping to optimization without explanation

#### Green Flags to Hit

- ✅ Systematic comparison approach
- ✅ Clear communication of trade-offs
- ✅ Considerations of real-world constraints
- ✅ Discussion of scalability

[Heres a Mock Interview for Reference 🔖](./mock-interview-algorithm-comparison.md)

### Introduction to Asymptotic Analysis And Big O

#### Why This Matters 🎯

First, let me tell you why this is super important

1. It's the universal language for discussing algorithms efficiency.
2. Every FANNG interviewer expects you to analyze your solution's complexity.
3. It helps you make better design decisions in real-world engineering.

#### Understanding Asymptotic Analysis 📈

Asymptotic analysis is about understanding how your algorithm performs as the input size grows.
Think of it like this:

> 🎯 **Interview Tip**: When i ask candidates about time complexity, <br> I'm not interested in exact running times. I want to know how the algorithm scales.

#### Key Concepts

1. Growth Rate Focus

   - We care about the dominant terms
   - Constants are dropped
   - Lower order terms are ignored

2. Input Size Matters

   - Usually represented as 'n'
   - Could be array length, string size, matrix dimensions, etc.

#### Big(O) Notation Explained 🔍

Big O notation is our way of expressing the worst-case time complexity of an algorithm.

##### The Formal Definition

For functions f(n) and g(n), we say f(n) = O(g(n)) if there exist positive constants c and n₀ such that:

```math
0 ≤ f(n) ≤ c × g(n) for all n ≥ n₀
```

This formula might look complex, but let's break it down into straightforward pieces.

###### What Each Part Means 🧩

1. $f(n)$: This is your algorithm's time complexity, which tells us the steps it takes as input size $n$ grows.
2. $g(n)$: This is a reference function - usually something like $n^2$ or $n^3$ or $log(n)$ -- used to categorize $f(n)$ by how it grows.
3. $c$: This constant multiplier helps adjust $g(n)$ to fit on top of $f(n)$ as an upper bound. It's just a scaling factor.
4. $n₀$: This is the starting point where we want out Big O to apply. For larger inputs $n >= n₀$ the formula will hold, but don't worry about tiny inputs.

##### Why This Matters 🎯

When we say $f(n) = O(g(n))$, we're saying that our algorithm's complexity is no worse than the growth rate of g(n) for large inputs.
In interviews, Big O tells the interviewer you understand efficiently how your code will run as input scale.

##### In Plain English 🗣️

> 💡 **Interview Gold**: I tell my students to think of Big O as answering the question:<br> "What happens to my algorithm's performance when the input get really, really big?"

##### Common Big O Complexities (From Best to Worst)

1.  $O(1)$ - Constant Time

    ```javascript
    function getFirst(arr) {
      return arr[0]; // Always one operation
    }
    ```

2.  $O(log n)$ - Logarithmic Time

    ```javascript
    function binarySearch(arr, target) {
      let left = 0,
        right = arr.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        // ... rest of binary search
      }
    }
    ```

3.  $O(n)$ - Linear Time

    ```javascript
    function findMax(arr) {
      let maxVal = -Infinity;
      for (const num of arr) {
        // One pass through n elements
        maxVal = Math.max(maxVal, num);
      }
      return maxVal;
    }
    ```

4.  $O(n log n)$ - Linearithmic Time

    ```javascript
    function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      // Divide and conquer
      // Common in efficient sorting algorithms
    }
    ```

5.  $O(n^2)$ - Quadratic Time

```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      // Nested loops = quadratic time
    }
  }
}
```

#### Interview Tips & Tricks

1. **Quick Identification**

   - Single Loop through input $ → O(n)$
   - Nested Loops $→$ Usually $O(n²)$
   - Divide input half $→$ Likely $O(log n)$
   - Recursive with multiple branches $→$ Consider $O(b^n)$ where b is the branches

2. **Common Gotchas**

   ```javascript
   // This is O(n), not O(2n)
   for (let i = 0; i < n; i++) {
     console.log(i);
   }
   for (let j = 0; j < n; j++) {
     console.log(j);
   }

   // This is O(n²), not O(n)
   for (let i = 0; i < n; i++) {
     for (let j = 0; j < i; j++) {
       // Even though j goes to i
       console.log(i, j);
     }
   }
   ```

3. **Analysis Framework**
   When analyzing complexity in an interview
   1. Identify the input size(s)
   2. Count operations in terms of input
   3. Keep the dominant term
   4. Drop constants

#### 🚀 Pro Tips from My Interview Experience

1. Always Verbalize

   - "Let me analyze the time complexity..."
   - "Since we have nested loops going up to n.."
   - "This is similar to binary search, so we get $O(log n)$"

2. Space Complexity

   - Don't forget about space.
   - Count extra space used.
   - Recursive calls count towards space complexity.

#### Key Takeaways

1. Always analyze both time and space complexity.
2. Focus on worst-case scenarios.
3. Practice identifying patterns.
4. Remember that readability is still important.

#### Patterns for Analyzing Time Complexity ⌛

Here are some of the most common patterns you'll encounter when determining the time complexity of an algorithm:

1. Constant Time - $O(1)$

   - Operations that take a fixed amount of time regardless of input size.
   - Examples: Accessing an element in an array, performing a basic arithmetic operation.

2. Logarithmic Time - $O(log n)$

   - Algorithms that divide the problem space in half on each iteration.
   - Examples: Binary search, tree traversal algorithms

3. Linear Time - $O(n)$

   - Algorithms that performs a single pass through the input.
   - Examples: Iterating through an array, searching for an element in a list

4. Linearithmic Time - $O(n log n)$

   - Algorithms that combine a logarithmic operation with a linear operation.
   - Examples: Efficient sorting algorithms like merge sort & quick sort.

5. Quadratic Time - $O(n²)$

   - Algorithms with nested loops that each iterate through the entire input.
   - Examples: Brute force solutions for problems like Traveling Salesman.

6. Exponential Time - $O(2^n)$

   - Algorithms that consider all possible combinations of the input
   - Example: Recursive solutions to the Fibonacci sequence or the Knapsack problem

#### Patterns for Analyzing Space Complexity 💾

When it comes to space complexity, the common patterns include:

1. Constant Space - $O(1)$

   - Algorithms that use a fixed amount of additional space, regardless of input size.
   - Examples: Swapping elements in an array, maintaining fewer pointer variables

2. Linear Space - $O(n)$

   - Algorithms that create additional data structures proportional to the input size.
   - Examples: Creating a new array or list to store intermediate results.

3. Quadratic Space - $O(n²)$

   - Algorithms that create a 2D structures proportional to the square of the input size.
   - Examples: Building an adjacency matrix to represent a graph.

4. Memoized Space - $O(n)$

   - Algorithms that cache intermediate results to avoid redundant computations.
   - Examples: Dynamic programming solutions that store previously computed values.

[Heres a Mock Interview for Reference 🔖](./mock-interview-time-and-space-complexity.md)
