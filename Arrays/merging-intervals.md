### Merging Intervals Pattern

The **Merging Intervals Pattern** is a popular technique for solving problems involving overlapping or contiguous intervals in arrays. This pattern involves sorting the intervals and then merging any overlapping or adjacent intervals to simplify the data. It’s particularly useful for tasks involving scheduling, time ranges, or combining overlapping events.

#### When to Use the Merging Intervals Pattern?

The Merging Intervals pattern is effective when dealing with:

1. **Overlapping Intervals**: Problems that require you to find or combine overlapping intervals, such as meeting rooms that need to be scheduled back-to-back.
2. **Contiguous Ranges**: Situations where you need to identify ranges or periods where events occur without gaps.
3. **Intervals Within a Range**: Problems that require checking if a new interval overlaps with an existing range, or adding a new interval and updating the existing intervals accordingly.

Examples of problems where this pattern is helpful include:

- **Merging overlapping intervals** (e.g., "Merge Intervals").
- **Inserting a new interval** into an existing list of sorted intervals.
- **Finding gaps or overlapping ranges** within schedules or timelines.
- **Identifying common or distinct intervals** across multiple sets of intervals.

> **🔍 Efficiency Tip**: Sorting intervals beforehand is crucial for this pattern, as it allows you to scan and merge in a single pass with linear complexity.

#### Steps in the Merging Intervals Pattern

The typical approach to solve merging intervals problems involves these steps:

1. **Sort the Intervals**: Begin by sorting the intervals based on their starting values. Sorting ensures that once you start processing an interval, all potential overlaps with previous intervals are already merged.

2. **Initialize a Result List**: Use a list (often called `mergedIntervals`) to keep track of the combined intervals. This will store the final, merged intervals after checking for overlaps.

3. **Traverse and Merge**: Iterate through the sorted intervals and check if each interval overlaps with the previous one:

   - If there’s an overlap, merge the intervals by updating the end of the current interval.
   - If there’s no overlap, add the current interval to the result list and proceed to the next interval.

4. **Return the Result**: After merging all intervals, the result list contains the final set of non-overlapping intervals.

#### Example Problem: Merging Overlapping Intervals

Given a list of intervals, merge all overlapping intervals into one and return the result. Each interval is represented as a list of two numbers, `[start, end]`, where `start` is the beginning and `end` is the end.

- **Example Input**: `[[1, 3], [2, 6], [8, 10], [15, 18]]`
- **Example Output**: `[[1, 6], [8, 10], [15, 18]]`

##### Solution

```javascript
function mergeIntervals(intervals) {
  // Step 1: Sort the intervals by their starting points
  intervals.sort((a, b) => a[0] - b[0]);

  // Step 2: Initialize an empty array to hold merged intervals
  const merged = [];

  // Step 3: Traverse each interval
  for (let interval of intervals) {
    // If merged is empty or there's no overlap with the last interval in merged
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval); // Add current interval to merged
    } else {
      // There's an overlap, so merge the intervals
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      );
    }
  }

  return merged; // Return the merged intervals
}
```

- **Time Complexity**: \( O(n \log n) \), dominated by the sorting step.
- **Space Complexity**: \( O(n) \) to store the merged intervals.

#### Types of Problems Using Merging Intervals Pattern

##### 1. Inserting a New Interval

In this variation, you’re given a sorted list of intervals and a new interval to insert. The goal is to insert the interval in the correct position and merge any overlapping intervals.

- **Steps**:
  - Insert the interval into the sorted list in the correct position.
  - Follow the standard merging steps to handle any overlaps that result from the insertion.

##### 2. Meeting Room Allocation

Given a list of time intervals for meetings, determine if a person can attend all meetings or if a new meeting room is required. This problem often involves identifying overlapping intervals to determine if conflicts exist.

- **Steps**:
  - Sort the intervals by start time.
  - Traverse and check for any overlaps between consecutive intervals.

##### 3. Employee Free Time

Given schedules of multiple employees, identify the common free intervals. This problem involves merging intervals across different lists and identifying the gaps between them.

- **Steps**:
  - Flatten and sort all intervals across employees.
  - Use the merging technique to identify gaps between merged intervals.

#### Common Pitfalls to Avoid

1. **Not Sorting the Intervals**: If you skip sorting, intervals may not be in the correct order, and the merging step will produce incorrect results.
2. **Mismanaging Overlaps**: Forgetting to update the end value when merging overlapping intervals can lead to incorrect merged ranges.
3. **Edge Cases**: Be mindful of intervals that are contiguous but not overlapping (e.g., `[1, 2]` and `[2, 3]`), and consider intervals that start and end at the same point.

> **⚠️ Debugging Tip**: For complex intervals, visualize the intervals on a timeline to ensure the merging logic accounts for all overlaps and gaps accurately.

#### Example Problem: Inserting a New Interval

In this problem, a new interval is inserted into an existing list of sorted intervals, and overlapping intervals are merged.

```javascript
function insertInterval(intervals, newInterval) {
  const merged = [];
  let i = 0;

  // Add all intervals before newInterval starts
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    merged.push(intervals[i]);
    i++;
  }

  // Merge overlapping intervals with newInterval
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  merged.push(newInterval); // Add the merged interval

  // Add remaining intervals
  while (i < intervals.length) {
    merged.push(intervals[i]);
    i++;
  }

  return merged;
}
```

This solution effectively handles insertion and merging, ensuring that all overlapping intervals are combined into one.

> **📝 Note**: The Merging Intervals pattern is especially valuable in interviews for problems related to scheduling, overlapping events, and combining ranges. Understanding this pattern and practicing variations will make it easier to solve complex interval problems efficiently.
