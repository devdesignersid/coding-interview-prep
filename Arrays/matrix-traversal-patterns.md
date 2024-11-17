### Matrix Traversal Patterns

Matrix traversal patterns are techniques for systematically navigating and processing elements in a 2D array (or matrix). Matrices are common in programming problems involving grids, maps, and tables, where traversal patterns help efficiently solve tasks like pathfinding, counting, or applying transformations.

Different traversal strategies address unique problem requirements, such as moving in specific directions, searching for paths, or processing only certain areas within the matrix.

#### Common Matrix Traversal Patterns

Each pattern has specific use cases and involves a particular approach to moving through the matrix:

1. **Row-wise and Column-wise Traversal**
2. **Depth-First Search (DFS)**
3. **Breadth-First Search (BFS)**
4. **Diagonal Traversal**
5. **Spiral Traversal**
6. **Boundary Traversal**

> **💡 Practical Tip**: Traversal patterns frequently use **bounds checking** to avoid out-of-bound errors, especially at the edges of the matrix.

### 1. Row-wise and Column-wise Traversal

Row-wise and column-wise traversals are the most straightforward patterns, typically used when all elements need to be processed in a predictable order.

- **Row-wise**: Traverse each row from left to right, then move to the next row.
- **Column-wise**: Traverse each column from top to bottom, then move to the next column.

#### Use Cases:

- Summing all elements in a matrix.
- Applying transformations or changes across rows or columns.

#### Code Example

```javascript
// Row-wise traversal
function rowWiseTraversal(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      console.log(matrix[i][j]);
    }
  }
}

// Column-wise traversal
function columnWiseTraversal(matrix) {
  for (let j = 0; j < matrix[0].length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i][j]);
    }
  }
}
```

### 2. Depth-First Search (DFS)

DFS is a recursive or stack-based traversal used to explore a matrix in all directions (up, down, left, right, and sometimes diagonals). It’s especially useful in pathfinding and connected component problems, such as counting islands or finding regions within a grid.

#### Use Cases:

- Pathfinding and maze-solving.
- Counting distinct connected regions, e.g., "number of islands" in a grid.
- Identifying boundaries in a matrix.

#### Code Example

```javascript
function dfs(matrix, x, y, visited) {
  if (
    x < 0 ||
    x >= matrix.length ||
    y < 0 ||
    y >= matrix[0].length ||
    visited[x][y] ||
    matrix[x][y] === 0
  ) {
    return;
  }

  // Mark cell as visited
  visited[x][y] = true;

  // Explore all 4 directions
  dfs(matrix, x + 1, y, visited); // Down
  dfs(matrix, x - 1, y, visited); // Up
  dfs(matrix, x, y + 1, visited); // Right
  dfs(matrix, x, y - 1, visited); // Left
}
```

### 3. Breadth-First Search (BFS)

BFS is a queue-based traversal technique that explores all cells at the current depth level before moving to the next. It’s commonly used in shortest-path problems within a matrix, where we need to explore neighbors in all directions systematically.

#### Use Cases:

- Finding the shortest path in unweighted grids (e.g., shortest path from a starting point to a target).
- Spreading effects or distance calculations from a specific origin.
- Calculating minimum steps or levels in a matrix.

#### Code Example

```javascript
function bfs(matrix, startX, startY) {
  const queue = [[startX, startY]];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1], // Down, Up, Right, Left
  ];
  const visited = Array.from({ length: matrix.length }, () =>
    Array(matrix[0].length).fill(false)
  );
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    console.log(matrix[x][y]);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < matrix.length &&
        newY >= 0 &&
        newY < matrix[0].length &&
        !visited[newX][newY]
      ) {
        visited[newX][newY] = true;
        queue.push([newX, newY]);
      }
    }
  }
}
```

### 4. Diagonal Traversal

In diagonal traversal, elements are traversed diagonally either from top-left to bottom-right or from top-right to bottom-left. This pattern is typically used in problems where relationships along diagonals matter, such as anti-diagonals in image processing or game boards.

#### Use Cases:

- Summing diagonal elements.
- Image and data processing applications requiring diagonal relationships.

#### Code Example

```javascript
function diagonalTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let d = 0; d < rows + cols - 1; d++) {
    let row = d < cols ? 0 : d - cols + 1;
    let col = d < cols ? d : cols - 1;

    while (row < rows && col >= 0) {
      console.log(matrix[row][col]);
      row++;
      col--;
    }
  }
}
```

### 5. Spiral Traversal

Spiral traversal follows a specific order: moving right across the top row, then down the right column, then left across the bottom row, and finally up the left column. This process repeats until all elements are visited.

#### Use Cases:

- Presenting data in a spiral order, e.g., visual applications.
- Problems where elements need to be accessed layer by layer.

#### Code Example

```javascript
function spiralTraversal(matrix) {
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse from left to right along the top row
    for (let j = left; j <= right; j++) {
      console.log(matrix[top][j]);
    }
    top++;

    // Traverse from top to bottom along the right column
    for (let i = top; i <= bottom; i++) {
      console.log(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      // Traverse from right to left along the bottom row
      for (let j = right; j >= left; j--) {
        console.log(matrix[bottom][j]);
      }
      bottom--;
    }

    if (left <= right) {
      // Traverse from bottom to top along the left column
      for (let i = bottom; i >= top; i--) {
        console.log(matrix[i][left]);
      }
      left++;
    }
  }
}
```

### 6. Boundary Traversal

Boundary traversal involves visiting only the edge elements of the matrix. This is useful when focusing on the perimeter elements rather than the entire matrix content.

#### Use Cases:

- Problems that require operations only on the border elements of a matrix.
- Extracting the boundary data for perimeter-based algorithms.

#### Code Example

```javascript
function boundaryTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Top row
  for (let j = 0; j < cols; j++) {
    console.log(matrix[0][j]);
  }

  // Right column (skip the first element as it’s already covered)
  for (let i = 1; i < rows; i++) {
    console.log(matrix[i][cols - 1]);
  }

  // Bottom row (if not the same as top row)
  if (rows > 1) {
    for (let j = cols - 2; j >= 0; j--) {
      console.log(matrix[rows - 1][j]);
    }
  }

  // Left column (if not the same as right column)
  if (cols > 1) {
    for (let i = rows - 2; i > 0; i--) {
      console.log(matrix[i][0]);
    }
  }
}
```

### Common Pitfalls to Avoid

1. **Out-of-Bound Errors**: Ensure indices don’t go out of the matrix bounds, especially when working with non-square matrices or moving in all directions.
2. **Incorrect Visit Tracking**: In DFS or BFS, always mark visited cells to avoid revisiting and entering infinite loops.
3. **Handling Edge Cases**: Account for single-row, single-column, or empty matrices, which might need unique handling in traversal patterns like spiral and boundary traversals.

> **🔍 Debugging Tip**: Printing intermediate traversal steps can help identify if any direction or condition is incorrectly applied, especially in complex patterns like spiral traversal.

### Summary

Matrix traversal patterns provide a systematic approach to navigating and solving problems on 2D arrays. Understanding these patterns enables efficient solutions for pathfinding, searching, and pattern recognition in grids, with applications ranging from game development to image processing. Master
