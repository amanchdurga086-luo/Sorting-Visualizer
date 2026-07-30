import { bubbleSort } from "./BubbleSort.js";
import { selectionSort } from "./SelectionSort.js";
import { insertionSort } from "./InsertionSort.js";
import { mergeSort } from "./MergeSort.js";
import { quickSort } from "./QuickSort.js";
import { heapSort } from "./HeapSort.js";

// All details shown on the page for every sorting algorithm.
export const sortingAlgorithms = {
  bubble: {
    name: "Bubble Sort",
    description: "Repeatedly compares adjacent values and swaps them when they are out of order. Larger values gradually bubble to the end.",
    intro: "Bubble Sort scans neighbouring pairs, moving the largest remaining value to the right on each pass.",
    complexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
    code: "repeat n - 1 times\n  swapped = false\n  for each adjacent pair\n    if left > right\n      swap the pair\n      swapped = true\n  if not swapped, stop",
    sort: bubbleSort
  },

  selection: {
    name: "Selection Sort",
    description: "Finds the smallest unsorted value and places it at the next position, growing a sorted section from left to right.",
    intro: "Selection Sort searches the remaining values for a minimum, then places it in its final spot.",
    complexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
    code: "for each position i\n  minimum = i\n  scan the unsorted values\n    if value < current minimum\n      minimum = current index\n  swap minimum with position i",
    sort: selectionSort
  },

  insertion: {
    name: "Insertion Sort",
    description: "Builds a sorted portion one value at a time by shifting larger values right to make room for the current value.",
    intro: "Insertion Sort grows a sorted left side by inserting each new value in the right place.",
    complexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)", space: "O(1)" },
    code: "for i from 1 to n - 1\n  key = array[i]\n  while previous value > key\n    shift previous value right\n  insert key at its position",
    sort: insertionSort
  },

  merge: {
    name: "Merge Sort",
    description: "Recursively divides the array into smaller halves, then merges sorted halves back together in order.",
    intro: "Merge Sort divides the array until each piece is sorted, then carefully merges those pieces back together.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    code: "mergeSort(left, right)\n  if left >= right, return\n  split at middle\n  sort both halves\n  merge the two sorted halves",
    sort: mergeSort
  },

  quick: {
    name: "Quick Sort",
    description: "Chooses a pivot, partitions smaller and larger values around it, then recursively sorts each side.",
    intro: "Quick Sort places one pivot at a time, splitting the problem into smaller independent sections.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n^2)", space: "O(log n)" },
    code: "quickSort(low, high)\n  choose a pivot\n  partition values around pivot\n  quickSort(left partition)\n  quickSort(right partition)",
    sort: quickSort
  },

  heap: {
    name: "Heap Sort",
    description: "Builds a max heap so the largest value is always at the root, then repeatedly moves that value to the end.",
    intro: "Heap Sort organizes values into a max heap, repeatedly taking the largest remaining value from its root.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
    code: "build a max heap\nfor end from n - 1 down to 1\n  swap root with end\n  restore heap below end",
    sort: heapSort
  }
};
