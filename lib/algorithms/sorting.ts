export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sortedIndices: number[];
}

function baseStep(array: number[], sortedIndices: number[] = []): SortStep {
  return { array: [...array], comparing: [], swapping: [], sortedIndices: [...sortedIndices] };
}

export function bubbleSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [baseStep(arr)];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sortedIndices: [...sorted] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        steps.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sortedIndices: [...sorted] });
      }
    }
    sorted.unshift(arr.length - i - 1);
    if (!swapped) break;
  }
  steps.push({ array: [...arr], comparing: [], swapping: [], sortedIndices: arr.map((_, i) => i) });
  return steps;
}

export function selectionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [baseStep(arr)];
  const sorted: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], comparing: [minIdx, j], swapping: [], sortedIndices: [...sorted] });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: [...arr], comparing: [], swapping: [i, minIdx], sortedIndices: [...sorted] });
    }
    sorted.push(i);
  }
  steps.push({ array: [...arr], comparing: [], swapping: [], sortedIndices: arr.map((_, i) => i) });
  return steps;
}

export function insertionSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [baseStep(arr)];
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      steps.push({ array: [...arr], comparing: [j - 1, j], swapping: [], sortedIndices: Array.from({ length: i }, (_, k) => k) });
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      steps.push({ array: [...arr], comparing: [], swapping: [j - 1, j], sortedIndices: Array.from({ length: i }, (_, k) => k) });
      j--;
    }
  }
  steps.push({ array: [...arr], comparing: [], swapping: [], sortedIndices: arr.map((_, i) => i) });
  return steps;
}

export function mergeSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [baseStep(arr)];

  function merge(lo: number, mid: number, hi: number) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...arr], comparing: [lo + i, mid + 1 + j], swapping: [], sortedIndices: [] });
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
      steps.push({ array: [...arr], comparing: [], swapping: [k - 1], sortedIndices: [] });
    }
    while (i < left.length) { arr[k++] = left[i++]; steps.push({ array: [...arr], comparing: [], swapping: [k - 1], sortedIndices: [] }); }
    while (j < right.length) { arr[k++] = right[j++]; steps.push({ array: [...arr], comparing: [], swapping: [k - 1], sortedIndices: [] }); }
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  sort(0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: [], sortedIndices: arr.map((_, i) => i) });
  return steps;
}

export function quickSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [baseStep(arr)];

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...arr], comparing: [j, hi], swapping: [], sortedIndices: [] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ array: [...arr], comparing: [], swapping: [i, j], sortedIndices: [] });
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    steps.push({ array: [...arr], comparing: [], swapping: [i + 1, hi], sortedIndices: [] });
    return i + 1;
  }

  function sort(lo: number, hi: number) {
    if (lo < hi) {
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    }
  }

  sort(0, arr.length - 1);
  steps.push({ array: [...arr], comparing: [], swapping: [], sortedIndices: arr.map((_, i) => i) });
  return steps;
}

export const SORT_ALGORITHMS = {
  bubble: { name: "Bubble Sort", fn: bubbleSortSteps, complexity: "O(n²) time, O(1) space", applications: "Teaching tool; effective only on nearly-sorted, small datasets." },
  selection: { name: "Selection Sort", fn: selectionSortSteps, complexity: "O(n²) time, O(1) space", applications: "Minimizes the number of swaps; useful when writes are expensive." },
  insertion: { name: "Insertion Sort", fn: insertionSortSteps, complexity: "O(n²) time, O(1) space", applications: "Fast on nearly-sorted or small arrays; used as the base case in hybrid sorts like Timsort." },
  merge: { name: "Merge Sort", fn: mergeSortSteps, complexity: "O(n log n) time, O(n) space", applications: "Stable, predictable performance; standard for external sorting and linked lists." },
  quick: { name: "Quick Sort", fn: quickSortSteps, complexity: "O(n log n) avg, O(n²) worst, O(log n) space", applications: "Fastest in practice for in-memory arrays; used in most standard library sort implementations." },
} as const;

export type SortAlgorithmKey = keyof typeof SORT_ALGORITHMS;
