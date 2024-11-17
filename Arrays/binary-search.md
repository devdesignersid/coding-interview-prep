### Binary Search on Sorted Arrays Pattern

**Binary Search** is an algorithm that searches for a target value in a sorted array by repeatedly dividing the search interval in half. This approach allows for efficient searches in \( O(\log n) \) time, as it reduces the problem size by half with each comparison. The Binary Search pattern is commonly used in problems where the data is sorted, enabling fast lookups, boundary searches, and optimizations.

#### When to Use Binary Search?

Binary Search is ideal for problems where:

1. **The data is sorted or monotonic** (either in ascending or descending order).
2. **Finding a specific element** or determining its position in a sorted array (e.g., "Search for a target value").
3. **Finding boundaries** for conditions, such as the first or last occurrence of a value (e.g., "Find First and Last Position of Element in Sorted Array").
4. **Optimization Problems** where you need to find a minimum or maximum that satisfies certain conditions (e.g., "Minimum Capacity to Ship Packages").
5. **Searching in Infinite or Large-Range Arrays** where the size of the data is unknown or very large.

> **💡 Interview Tip**: If you recognize that the problem is about searching in a sorted array, always consider Binary Search as a potential solution.

#### How Binary Search Works

Binary Search works by setting two pointers (left and right) at the start and end of the array. The algorithm then repeatedly narrows the search interval by comparing the target with the middle element:

1. **Initialize** `left` to the start and `right` to the end of the array.
2. **Compute the middle index** as \( \text{mid} = \frac{\text{left} + \text{right}}{2} \).
3. **Compare** the middle element with the target:
   - If `target == arr[mid]`, return `mid`.
   - If `target < arr[mid]`, narrow the search to the left half by setting `right = mid - 1`.
   - If `target > arr[mid]`, narrow the search to the right half by setting `left = mid + 1`.
4. **Repeat** steps 2–3 until `left > right` (i.e., the target is not found).

#### Basic Binary Search Template

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid
    } else if (arr[mid] < target) {
      left = mid + 1; // Move to the right half
    } else {
      right = mid - 1; // Move to the left half
    }
  }

  return -1; // Target not found
}
```

---

### Variants of Binary Search

Binary Search is highly versatile and can be adapted for different scenarios beyond simply finding an element’s index. Here are some common variations and their applications:

#### 1. Binary Search for Boundary Values (First or Last Occurrence)

Sometimes, you need to find the first or last occurrence of a target element, especially when duplicate values are present. In these cases, modify the binary search by adjusting how `left` and `right` are updated when a match is found.

- **First Occurrence**: Narrow the search to the left half even after finding the target.
- **Last Occurrence**: Narrow the search to the right half even after finding the target.

```javascript
// Find the first occurrence of target
function findFirstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid; // Update result but keep searching to the left
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

#### 2. Binary Search for Condition-based Optimization

In optimization problems, binary search can help find the minimum or maximum value that satisfies a condition. These problems often involve searching for a boundary in a function or sequence that meets a requirement.

**Example**: Finding the minimum capacity to ship packages within `D` days.

- **Binary Search on Solution Space**: Use binary search to narrow down the possible range of solutions by setting `left` and `right` based on problem constraints (e.g., maximum element vs. sum of all elements).

The **Binary Search for Condition-Based Optimization** technique is a more advanced application of binary search that’s especially useful for optimization problems. Instead of searching for a specific value, this approach searches for a boundary value that satisfies a condition, often involving a minimum or maximum constraint.

This technique is commonly used when:

1. The solution space can be represented as a **range of values** (e.g., a range of capacities, speeds, or sizes).
2. The problem requires finding the **smallest or largest possible value** that meets certain conditions.
3. The **function or array is monotonic** (the condition either only starts being true or only stops being true at a certain boundary).

#### How Condition-Based Binary Search Works

In this pattern, binary search is applied to a continuous or discrete range of potential solutions rather than a sorted array. By setting up a **predicate function** (a condition) that evaluates to true or false based on whether a candidate solution satisfies the requirements, you can iteratively narrow down the range to find the optimal solution.

1. **Define the Search Space**: Identify the minimum and maximum values (`left` and `right`) that could potentially satisfy the condition. The search space should cover all possible answers.
2. **Predicate Function**: Define a function `condition(mid)` that returns `true` if the candidate value `mid` meets the required conditions, and `false` otherwise.
3. **Binary Search Loop**:
   - Calculate `mid` as the midpoint of `left` and `right`.
   - Use the predicate function to check if `mid` satisfies the condition.
     - If `condition(mid)` is `true`, update `right = mid` (if searching for the minimum) or `left = mid` (if searching for the maximum).
     - If `condition(mid)` is `false`, adjust `left` or `right` to exclude `mid` and narrow the search range.
4. **Return the Optimal Value**: When `left` and `right` converge, they represent the boundary value that meets the optimization criteria.

### Common Problems Using Condition-Based Binary Search

#### 1. Minimum Capacity to Ship Packages Within D Days

**Problem Statement**: Given an array of weights and an integer `D`, find the minimum capacity of a ship required to ship all packages within `D` days. Each day, the ship carries packages in the order given, without reordering them.

**Approach**:

1. **Define the Search Space**:

   - The minimum capacity is `max(weights)`, since at least the heaviest package must fit in one shipment.
   - The maximum capacity is `sum(weights)`, as this would allow all packages to be shipped in one day.

2. **Define the Condition**: Use a predicate function to check if a given capacity can ship all packages within `D` days:

   - Start at the beginning of the weights array, adding weights to a running total until it exceeds the capacity.
   - Each time the running total exceeds the capacity, increment the day count and start a new load.
   - If the number of days exceeds `D`, the capacity is insufficient.

3. **Binary Search on Capacity**: Use binary search to find the minimum capacity that satisfies the condition.

```javascript
function shipWithinDays(weights, D) {
  let left = Math.max(...weights); // Minimum capacity
  let right = weights.reduce((a, b) => a + b, 0); // Maximum capacity

  function canShipWithCapacity(capacity) {
    let days = 1,
      currentLoad = 0;

    for (let weight of weights) {
      if (currentLoad + weight > capacity) {
        days++; // Start a new day
        currentLoad = 0;
      }
      currentLoad += weight;
    }

    return days <= D;
  }

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (canShipWithCapacity(mid)) {
      right = mid; // Try a smaller capacity
    } else {
      left = mid + 1; // Increase capacity
    }
  }

  return left; // Minimum capacity needed to ship within D days
}
```

**Explanation**:

- The binary search loop narrows down the minimum capacity by testing mid-values against the condition.
- The function `canShipWithCapacity` checks if a given capacity allows shipping within the day limit, thus driving the binary search.

#### 2. Finding the Square Root (Integer Approximation)

**Problem Statement**: Given a non-negative integer `x`, find the integer part of the square root of `x`.

**Approach**:

1. **Define the Search Space**:

   - The minimum possible square root is `0`.
   - The maximum possible square root is `x`, as `x` itself could be the root if `x = 1`.

2. **Define the Condition**:

   - Use a predicate function to check if a candidate integer `mid` squared is less than or equal to `x`.

3. **Binary Search on Root**:
   - Use binary search to find the largest integer `mid` such that `mid^2` is less than or equal to `x`.

```javascript
function integerSquareRoot(x) {
  if (x < 2) return x;

  let left = 1;
  let right = x;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid === x) {
      return mid;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right; // `right` is the integer part of the square root
}
```

**Explanation**:

- The binary search keeps narrowing down until `left` and `right` converge.
- Returning `right` gives the integer approximation of the square root, as it represents the largest integer whose square is ≤ `x`.

#### Key Takeaways

1. **Optimization of Solution Space**: Instead of iterating through possible solutions linearly, binary search allows for a rapid narrowing of the search space based on conditions.
2. **Predicate Function**: The key to condition-based binary search is defining an effective predicate function to determine whether the current `mid` value satisfies the required condition.
3. **Handling Boundaries**: Depending on whether you’re finding a minimum or maximum that satisfies the condition, adjust `left` or `right` based on the result of `condition(mid)`.
4. **Common Applications**:
   - Minimum/maximum capacity or cost problems (e.g., shipping packages within `D` days, minimizing time or load constraints).
   - Boundary-based optimization, such as finding thresholds, limits, or integer approximations.

Condition-based binary search is a highly efficient approach in problems where the solution space can be represented as a sorted, continuous range. It’s a valuable technique in technical interviews, especially for scenarios that involve searching for optimal values within constraints.

#### 3. Binary Search in Rotated Sorted Arrays

In rotated sorted arrays (e.g., `[4,5,6,7,0,1,2]`), a modified binary search can be used to locate a target efficiently. The key is identifying the sorted half of the array and performing a standard binary search within that segment.

### Common Problems Using Binary Search on Sorted Arrays

1. **Classic Binary Search** - Find a target element in a sorted array.
2. **Find First and Last Position of Element in Sorted Array** - Locate the first and last occurrence of a target value.
3. **Find Minimum in Rotated Sorted Array** - Locate the minimum element in a rotated sorted array.
4. **Peak Index in a Mountain Array** - Find the peak element in an array that increases and then decreases.
5. **Search Insert Position** - Find the position where a target should be inserted to maintain order.

---

### Example Problem: Search Insert Position

Given a sorted array and a target value, find the index where the target should be inserted to keep the array sorted. If the target is already present, return its index.

```javascript
function searchInsertPosition(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left; // Position where target should be inserted
}

// Example usage
console.log(searchInsertPosition([1, 3, 5, 6], 5)); // Output: 2
console.log(searchInsertPosition([1, 3, 5, 6], 2)); // Output: 1
```

**Explanation**:

- If the target is found, return its index.
- If not found, return `left`, as it will be the position where the target should be inserted to maintain the sorted order.

---

### Key Takeaways

- **Logarithmic Efficiency**: Binary Search on sorted arrays reduces time complexity from \( O(n) \) (linear search) to \( O(\log n) \).
- **Boundary Searches**: Use Binary Search variants to find the first or last occurrence of an element or to locate a range of values.
- **Infinite or Large Arrays**: In cases where array size is unknown or extremely large, Binary Search remains efficient by narrowing down possible ranges.

Mastering Binary Search and its variants will equip you with a powerful tool for a wide range of problems in technical interviews.
