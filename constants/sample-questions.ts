import { Question } from "@/types/question";

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "easy",
    topicSlug: "hashing",
    companies: ["Google", "Amazon", "Adobe"],
    pattern: "Hash Map",
    estimatedMinutes: 15,
    description:
      "Given an array of integers and a target value, return the indices of the two numbers that add up to the target. Assume exactly one solution exists and you can't use the same element twice.",
    hints: [
      "What if you could look up whether the complement of the current number has already been seen, in constant time?",
      "A single pass with a hash map avoids the need to check every pair.",
    ],
    bruteForce: {
      summary: "Check every pair of indices with two nested loops until the target sum is found.",
      complexity: "O(n²) time, O(1) space",
    },
    optimal: {
      summary:
        "Walk the array once, storing each value's index in a hash map. Before inserting, check whether the map already holds the complement (target minus current value).",
      complexity: "O(n) time, O(n) space",
    },
    edgeCases: [
      "Duplicate values that together form the target",
      "Negative numbers and zero",
      "No valid pair exists (should not occur per constraints, but guard defensively)",
    ],
    interviewTips: [
      "State the brute force first, then explain the trade-off you're making to reach O(n).",
      "Clarify whether the array is sorted — that changes whether a two-pointer approach is worth mentioning.",
    ],
    commonMistakes: [
      "Inserting into the map before checking for the complement, which can incorrectly pair an element with itself.",
      "Returning values instead of indices when the problem asks for indices.",
    ],
    code: [
      {
        language: "javascript",
        code: `function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}`,
      },
      {
        language: "python",
        code: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []`,
      },
    ],
  },
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    topicSlug: "sliding-window",
    companies: ["Meta", "Microsoft", "Uber"],
    pattern: "Sliding Window",
    estimatedMinutes: 25,
    description:
      "Given a string, find the length of the longest substring without repeating characters.",
    hints: [
      "Maintain a window defined by two pointers and expand it as long as characters stay unique.",
      "When a repeat is found, jump the left pointer directly past the previous occurrence instead of moving it one step at a time.",
    ],
    bruteForce: {
      summary: "Generate every substring and check each for uniqueness.",
      complexity: "O(n³) time, O(min(n, charset)) space",
    },
    optimal: {
      summary:
        "Use a sliding window with a hash map storing the last seen index of each character. Expand the right pointer, and when a duplicate is found within the window, move the left pointer just past its previous index.",
      complexity: "O(n) time, O(min(n, charset)) space",
    },
    edgeCases: [
      "Empty string",
      "String with all identical characters",
      "String where the entire string is already unique",
    ],
    interviewTips: [
      "Draw the window on a whiteboard example before coding — it clarifies the left-pointer jump logic.",
      "Mention the charset-size bound on space complexity; it shows you're thinking about constants, not just big-O.",
    ],
    commonMistakes: [
      "Moving the left pointer one step at a time instead of jumping past the duplicate, which degrades to O(n²).",
      "Forgetting to only jump left forward, never backward, when the stored index is outside the current window.",
    ],
    code: [
      {
        language: "javascript",
        code: `function lengthOfLongestSubstring(s) {\n  const lastSeen = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    const c = s[right];\n    if (lastSeen.has(c) && lastSeen.get(c) >= left) {\n      left = lastSeen.get(c) + 1;\n    }\n    lastSeen.set(c, right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}`,
      },
    ],
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "medium",
    topicSlug: "graphs",
    companies: ["Google", "Amazon", "Netflix"],
    pattern: "Topological Sort",
    estimatedMinutes: 30,
    description:
      "Given a number of courses and a list of prerequisite pairs, determine whether it's possible to finish all courses (i.e., whether the prerequisite graph is a DAG).",
    hints: [
      "This is equivalent to detecting a cycle in a directed graph.",
      "Kahn's algorithm (BFS with in-degree counting) and DFS with recursion-stack tracking both work.",
    ],
    bruteForce: {
      summary: "Simulate repeatedly removing courses with no remaining prerequisites until stuck or done.",
      complexity: "O(V·E) time in a naive repeated-scan implementation",
    },
    optimal: {
      summary:
        "Build an adjacency list and in-degree count for each course. Push all zero-in-degree courses to a queue, and repeatedly remove a course, decrementing the in-degree of its neighbors. If every course is processed, no cycle exists.",
      complexity: "O(V + E) time, O(V + E) space",
    },
    edgeCases: [
      "No prerequisites at all",
      "A self-loop prerequisite",
      "A prerequisite chain that forms a cycle across more than two courses",
    ],
    interviewTips: [
      "Say out loud that this reduces to cycle detection — interviewers want to see the abstraction, not just the code.",
      "Mention both BFS (Kahn's) and DFS approaches, then pick one to implement.",
    ],
    commonMistakes: [
      "Building the adjacency list in the wrong direction (prerequisite → course vs. course → prerequisite).",
      "Forgetting to track a visiting/visited state in the DFS approach, which misses back-edges within the current recursion stack.",
    ],
    code: [
      {
        language: "python",
        code: `from collections import deque\n\ndef can_finish(num_courses, prerequisites):\n    graph = [[] for _ in range(num_courses)]\n    indegree = [0] * num_courses\n    for course, pre in prerequisites:\n        graph[pre].append(course)\n        indegree[course] += 1\n\n    queue = deque(c for c in range(num_courses) if indegree[c] == 0)\n    visited = 0\n    while queue:\n        node = queue.popleft()\n        visited += 1\n        for nxt in graph[node]:\n            indegree[nxt] -= 1\n            if indegree[nxt] == 0:\n                queue.append(nxt)\n    return visited == num_courses`,
      },
    ],
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    topicSlug: "binary-search",
    companies: ["Google", "Apple", "Goldman Sachs"],
    pattern: "Binary Search",
    estimatedMinutes: 40,
    description:
      "Given two sorted arrays, find the median of the combined array in better than O(log(min(m,n))) — actually in exactly O(log(min(m,n))) time.",
    hints: [
      "You don't need to merge the arrays — you need to find the correct partition point in each array.",
      "Binary search on the smaller array's partition index, and derive the partition index of the larger array from it.",
    ],
    bruteForce: {
      summary: "Merge both arrays and take the middle element(s).",
      complexity: "O(m + n) time, O(m + n) space",
    },
    optimal: {
      summary:
        "Binary search over partition positions in the smaller array. For each candidate partition, compute the corresponding partition in the larger array so that the left halves combined equal the right halves combined (±1), then check the boundary values line up correctly.",
      complexity: "O(log(min(m, n))) time, O(1) space",
    },
    edgeCases: [
      "One array is empty",
      "Arrays of very different lengths",
      "Combined array has even vs. odd total length",
    ],
    interviewTips: [
      "This is a hard problem — it's fine to start with the merge approach to show you understand the goal before optimizing.",
      "Be precise about off-by-one boundaries; walk through a small example partition by hand before coding.",
    ],
    commonMistakes: [
      "Binary searching on the larger array instead of the smaller one, which can push partition indices out of bounds.",
      "Mishandling the even/odd total-length cases when computing the final median.",
    ],
    code: [
      {
        language: "cpp",
        code: `double findMedianSortedArrays(vector<int>& a, vector<int>& b) {\n    if (a.size() > b.size()) return findMedianSortedArrays(b, a);\n    int m = a.size(), n = b.size();\n    int lo = 0, hi = m;\n    while (lo <= hi) {\n        int i = (lo + hi) / 2;\n        int j = (m + n + 1) / 2 - i;\n        int aLeft = i == 0 ? INT_MIN : a[i - 1];\n        int aRight = i == m ? INT_MAX : a[i];\n        int bLeft = j == 0 ? INT_MIN : b[j - 1];\n        int bRight = j == n ? INT_MAX : b[j];\n        if (aLeft <= bRight && bLeft <= aRight) {\n            if ((m + n) % 2 == 0) return (max(aLeft, bLeft) + min(aRight, bRight)) / 2.0;\n            return max(aLeft, bLeft);\n        } else if (aLeft > bRight) hi = i - 1;\n        else lo = i + 1;\n    }\n    return 0.0;\n}`,
      },
    ],
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "easy",
    topicSlug: "dynamic-programming",
    companies: ["Adobe", "Amazon"],
    pattern: "1D DP / Fibonacci",
    estimatedMinutes: 12,
    description:
      "You're climbing a staircase with n steps. Each move you can climb 1 or 2 steps. Count the distinct number of ways to reach the top.",
    hints: [
      "The number of ways to reach step n is the sum of the ways to reach step n-1 and step n-2.",
      "This is structurally identical to computing a Fibonacci number.",
    ],
    bruteForce: {
      summary: "Recursively branch on taking 1 or 2 steps from every position, recomputing overlapping subproblems.",
      complexity: "O(2ⁿ) time, O(n) space (call stack)",
    },
    optimal: {
      summary:
        "Track only the previous two values as you iterate from step 1 to n, since each step only depends on the two before it.",
      complexity: "O(n) time, O(1) space",
    },
    edgeCases: ["n = 0", "n = 1", "n = 2"],
    interviewTips: [
      "Naming the Fibonacci connection immediately signals pattern recognition to the interviewer.",
      "Showing the O(1)-space rolling variables after the array-based DP demonstrates you can optimize space, not just time.",
    ],
    commonMistakes: [
      "Off-by-one errors in the base cases for n = 0 or n = 1.",
      "Using an array for memoization when two rolling variables would suffice.",
    ],
    code: [
      {
        language: "javascript",
        code: `function climbStairs(n) {\n  let prev = 1, curr = 1;\n  for (let i = 2; i <= n; i++) {\n    [prev, curr] = [curr, prev + curr];\n  }\n  return curr;\n}`,
      },
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "easy",
    topicSlug: "stack",
    companies: ["Amazon", "Microsoft", "Meta"],
    pattern: "Stack",
    estimatedMinutes: 10,
    description:
      "Given a string containing only the characters (){}[], determine whether the brackets are validly matched and nested.",
    hints: [
      "Process the string left to right, pushing opening brackets and matching closing brackets against the top of a stack.",
    ],
    bruteForce: {
      summary: "Repeatedly remove adjacent matched pairs from the string until no more can be removed, then check if it's empty.",
      complexity: "O(n²) time in a naive repeated-scan implementation",
    },
    optimal: {
      summary:
        "Push every opening bracket onto a stack. On a closing bracket, check that it matches the type on top of the stack, then pop. The string is valid if the stack is empty at the end.",
      complexity: "O(n) time, O(n) space",
    },
    edgeCases: [
      "Empty string (valid)",
      "A single unmatched closing bracket",
      "Only opening brackets with nothing closed",
    ],
    interviewTips: [
      "A map from closing to matching opening bracket keeps the matching logic in one line.",
      "Mention that this generalizes to validating any nested structure — expressions, HTML tags, etc.",
    ],
    commonMistakes: [
      "Forgetting to check the stack is non-empty before popping on a closing bracket, causing a runtime error.",
      "Not checking that the stack is fully empty at the very end (unmatched opening brackets left over).",
    ],
    code: [
      {
        language: "python",
        code: `def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for c in s:\n        if c in pairs.values():\n            stack.append(c)\n        elif c in pairs:\n            if not stack or stack.pop() != pairs[c]:\n                return False\n    return not stack`,
      },
    ],
  },
];
