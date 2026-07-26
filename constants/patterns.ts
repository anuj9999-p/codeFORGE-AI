export interface Pattern {
  slug: string;
  name: string;
  theory: string;
  whenToUse: string[];
  mistakes: string[];
  practiceQuestionIds: string[];
}

export const PATTERNS: Pattern[] = [
  {
    slug: "sliding-window",
    name: "Sliding Window",
    theory:
      "Maintain a contiguous window over the input, expanding the right edge and contracting the left edge based on a condition, instead of recomputing from scratch for every starting point.",
    whenToUse: [
      "The problem asks for a subarray or substring satisfying some constraint (length, sum, distinct characters).",
      "You notice the brute force recomputes overlapping work as the window shifts by one.",
    ],
    mistakes: [
      "Shrinking the window one step at a time when a direct jump would be correct and faster.",
      "Forgetting to update the running aggregate (sum, count map) when the window contracts.",
    ],
    practiceQuestionIds: ["longest-substring-without-repeating"],
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    theory:
      "Use two indices moving through the data — often from opposite ends or at different speeds — to avoid the nested loop a brute force would need.",
    whenToUse: [
      "The array or list is sorted, or can be sorted without losing needed information.",
      "You're looking for pairs, triplets, or a way to compare elements at increasing distance.",
    ],
    mistakes: [
      "Moving the wrong pointer when neither condition is clearly met.",
      "Not handling duplicate values, causing duplicate results in pair/triplet problems.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "fast-slow-pointer",
    name: "Fast & Slow Pointer",
    theory:
      "Two pointers move through a linked structure at different speeds (typically 1x and 2x) to detect cycles or find midpoints without extra space.",
    whenToUse: [
      "Cycle detection in a linked list or functional graph.",
      "Finding the middle of a linked list in a single pass.",
    ],
    mistakes: [
      "Not guarding against a null next pointer when advancing the fast pointer by two.",
      "Confusing 'meeting point' with 'cycle start' — they require different follow-up logic.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    theory:
      "Repeatedly halve a sorted search space based on a monotonic condition, rather than scanning linearly.",
    whenToUse: [
      "The data is sorted, or the answer itself is monotonic (binary search on the answer).",
      "You need better than O(n) lookup or want to search over a range of possible answers.",
    ],
    mistakes: [
      "Off-by-one errors in the loop condition (< vs <=) leading to infinite loops or missed elements.",
      "Not recognizing when a problem is 'binary search on the answer' rather than on the array itself.",
    ],
    practiceQuestionIds: ["median-of-two-sorted-arrays"],
  },
  {
    slug: "merge-intervals",
    name: "Merge Intervals",
    theory:
      "Sort intervals by start time, then sweep through merging any that overlap with the current interval being built.",
    whenToUse: [
      "The problem involves overlapping ranges — scheduling, merging, or finding gaps.",
    ],
    mistakes: [
      "Forgetting to sort by start time first, which breaks the single-pass merge logic.",
      "Using strict inequality when adjacent-but-touching intervals should also merge.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "dfs",
    name: "Depth-First Search",
    theory:
      "Explore as far as possible along a branch before backtracking, using recursion or an explicit stack.",
    whenToUse: [
      "Tree/graph traversal where you need to explore full paths (connected components, path existence).",
      "Combined with memoization for tree/graph DP problems.",
    ],
    mistakes: [
      "Forgetting to mark nodes visited before recursing, causing infinite loops on cyclic graphs.",
      "Not restoring state on backtrack when DFS is used for combinatorial search.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "bfs",
    name: "Breadth-First Search",
    theory:
      "Explore level by level using a queue, guaranteeing the shortest path in an unweighted graph is found first.",
    whenToUse: [
      "Shortest path in an unweighted graph.",
      "Level-order problems (minimum steps, minimum moves).",
    ],
    mistakes: [
      "Marking nodes visited when dequeued instead of when enqueued, which can add duplicates to the queue.",
      "Using BFS on a weighted graph where Dijkstra's algorithm is actually required.",
    ],
    practiceQuestionIds: ["course-schedule"],
  },
  {
    slug: "backtracking",
    name: "Backtracking",
    theory:
      "Build a solution incrementally, abandoning ('pruning') a branch as soon as it can't lead to a valid answer, then undoing the last choice to try another.",
    whenToUse: [
      "Combinatorial generation — permutations, combinations, subsets.",
      "Constraint satisfaction — N-Queens, Sudoku.",
    ],
    mistakes: [
      "Forgetting to undo (backtrack) a mutation to shared state before trying the next branch.",
      "Missing an early pruning check, causing the search space to blow up unnecessarily.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "greedy",
    name: "Greedy",
    theory:
      "Make the locally optimal choice at each step, provable correct only when the problem has the greedy-choice property and optimal substructure.",
    whenToUse: [
      "Interval scheduling, activity selection, minimum spanning trees.",
      "When you can prove — not just assume — that local optimality leads to global optimality.",
    ],
    mistakes: [
      "Applying a greedy strategy without proving it's actually optimal for the given problem.",
      "Sorting by the wrong key (e.g., start time instead of end time for interval scheduling).",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "heap",
    name: "Heap / Priority Queue",
    theory:
      "Maintain a partially ordered structure that gives O(log n) insertion and O(1) access to the min or max element.",
    whenToUse: [
      "Top-K problems, running medians, merging K sorted lists.",
      "Whenever you repeatedly need 'the smallest/largest remaining item' efficiently.",
    ],
    mistakes: [
      "Using a max-heap when a min-heap (or vice versa) is what the problem actually calls for.",
      "Rebuilding the heap from scratch instead of using incremental push/pop operations.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "union-find",
    name: "Union-Find",
    theory:
      "Track disjoint sets with near-constant-time union and find operations using path compression and union by rank.",
    whenToUse: [
      "Detecting cycles in an undirected graph.",
      "Grouping connected components incrementally as edges are added.",
    ],
    mistakes: [
      "Skipping path compression, which degrades find operations toward O(n).",
      "Forgetting union by rank/size, which can produce a heavily skewed tree.",
    ],
    practiceQuestionIds: [],
  },
  {
    slug: "topological-sort",
    name: "Topological Sort",
    theory:
      "Order the nodes of a directed acyclic graph so that every edge points from an earlier node to a later one — via Kahn's BFS algorithm or DFS with a stack.",
    whenToUse: [
      "Task scheduling, build systems, course prerequisites.",
    ],
    mistakes: [
      "Not detecting a cycle when one exists, silently returning an incomplete order.",
      "Building the adjacency list backwards relative to the dependency direction.",
    ],
    practiceQuestionIds: ["course-schedule"],
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    theory:
      "Break a problem into overlapping subproblems, solving and storing each exactly once (memoization or tabulation) instead of recomputing it.",
    whenToUse: [
      "The problem has optimal substructure and overlapping subproblems — often signaled by a naive exponential recursive solution.",
    ],
    mistakes: [
      "Missing a base case, causing incorrect results for small inputs.",
      "Using memoization but keying it incorrectly, so distinct states collide.",
    ],
    practiceQuestionIds: ["climbing-stairs"],
  },
];
