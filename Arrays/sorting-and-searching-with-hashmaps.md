### Sorting and Searching with Hash Maps

Combining **sorting** with **hash maps** is a powerful technique that enables efficient solutions for a variety of problems, especially those involving element frequency, uniqueness, and rapid lookups. Hash maps, with their \( O(1) \) average-time complexity for lookups, can make tasks like detecting duplicates or counting occurrences much faster than traditional methods.

#### When to Use Hash Maps for Sorting and Searching?

Hash maps are particularly effective when dealing with:

1. **Counting Occurrences**: Problems requiring frequency counts, such as finding the most common element or identifying duplicates, benefit from the direct access and storage that hash maps offer.
2. **Checking for Uniqueness**: Hash maps simplify the process of verifying unique elements in an array or list, which can be useful for problems like detecting duplicates or verifying if all elements are distinct.
3. **Mapping Elements to Indices**: For problems where you need to find indices of elements quickly, hash maps allow you to store positions and retrieve them in constant time. This is especially useful for problems like "Two Sum," where you look up elements based on their target difference.
4. **Optimizing Searches**: When searching within sorted data, hash maps can serve as a lookup table for already computed values, speeding up calculations like prefix sums or cumulative frequencies.

#### Why Master Kdane's Pattern

> **🚀 Efficiency Tip**: Using hash maps in combination with sorting can reduce complex nested loops to more efficient operations, lowering time complexity from $O(n^2) to $O(n)$ in many cases.

#### Common Patterns with Hash Maps in Sorting and Searching

##### 1. Counting Elements with Hash Maps

Hash maps are particularly useful for counting occurrences of elements. With a single pass through the array, you can populate a hash map with each element as a key and its count as the value.

- **Use Cases**

  - Finding the frequency of each element in an array.
  - Identifying the most or least frequent element(s).
  - Detecting duplicates by checking if any element count exceeds 1.

- **Example**

  ```javascript
  function countOccurrences(arr) {
    const countMap = new Map();
    for (const num of arr) {
      countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    return countMap; // Map of elements to their frequencies
  }
  ```

##### 2. Detecting Duplicates

With hash maps, you can quickly check for duplicates in an array by storing each element as you iterate. If you encounter an element that already exists in the map, you know it’s a duplicate.

- **Use Cases**

  - Ensuring that all elements in a list are unique.
  - Finding the first duplicate in a sequence.

- **Example**

  ```javascript
  function hasDuplicate(arr) {
    const seen = new Set();
    for (const num of arr) {
      if (seen.has(num)) {
        return true; // Duplicate found
      }
      seen.add(num);
    }
    return false; // No duplicates
  }
  ```

##### 3. Finding Pairs with a Specific Sum

For problems like "Two Sum," hash maps make it easy to find pairs that sum up to a target value. By storing each number’s index as you go, you can look up its complement (target - number) instantly.

- **Use Cases**

  - Finding two numbers that sum to a target value.
  - Avoiding nested loops when searching for element pairs.

- **Example**

  ```javascript
  function twoSum(arr, target) {
    const indexMap = new Map();
    for (let i = 0; i < arr.length; i++) {
      const complement = target - arr[i];
      if (indexMap.has(complement)) {
        return [indexMap.get(complement), i]; // Return indices of the two numbers
      }
      indexMap.set(arr[i], i);
    }
    return []; // No pair found
  }
  ```

##### 4. Counting Unique Elements after Sorting

In sorted data, hash maps help track unique elements efficiently by counting each occurrence. After sorting, traversing the data alongside a hash map lets you determine unique counts while maintaining order.

- **Use Cases**

  - Counting distinct values in a sorted array.
  - Identifying ranges or spans of unique values.

- **Example**

  ```javascript
  function countUniqueSorted(arr) {
    const uniqueMap = new Map();
    for (const num of arr) {
      uniqueMap.set(num, (uniqueMap.get(num) || 0) + 1);
    }
    return Array.from(uniqueMap.keys()); // Return unique elements
  }
  ```

#### Common Pitfalls to Avoid

1. **Ignoring Edge Cases**

   - Arrays with only one element, which are inherently unique.
   - Arrays with all duplicate values, which can yield high counts.
   - Empty arrays, which should return either zero or an empty result depending on the context.

2. **Overusing Hash Maps**

   - Not all problems require a hash map, and excessive use can lead to memory inefficiencies, especially if space complexity is a concern.

3. **Handling Collisions in Large Data Sets**
   - While collisions are rare in well-designed hash maps, they can impact performance. For massive datasets, consider alternate data structures like balanced trees or frequency arrays for higher efficiency.

> **💡 Pro Tip**: For problems requiring both sorting and searching, sort first and then leverage a hash map to reduce overall complexity. Sorting may take $O(n log n)$, but this setup can make searches or lookups far more efficient.

#### Example Problem: "Two Sum"

This problem involves finding two indices in an array that add up to a target. A hash map allows you to track each number and its complement without needing a nested loop.

```javascript
function twoSum(arr, target) {
  const indexMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (indexMap.has(complement)) {
      return [indexMap.get(complement), i];
    }
    indexMap.set(arr[i], i);
  }
  return []; // Return an empty array if no solution found
}
```

- **Time Complexity**: $O(n)$ as each element is processed in a single pass.
- **Space Complexity**: $O(n)$ for storing elements in the hash map.

By blending sorting and hash map usage, you can simplify complex problems, achieving efficient solutions for tasks that involve frequency, uniqueness, and rapid lookups.
