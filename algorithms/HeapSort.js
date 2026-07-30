/** Sort values by repeatedly moving the maximum heap root to the end. */
export async function heapSort({ values, compare, swap, markSorted }) {
  async function heapify(heapSize, rootIndex) {
    let largestIndex = rootIndex;
    const leftChild = rootIndex * 2 + 1;
    const rightChild = rootIndex * 2 + 2;

    if (leftChild < heapSize) {
      if (!await compare(largestIndex, leftChild, "Checking the left child in the heap.")) return false;
      if (values[leftChild] > values[largestIndex]) largestIndex = leftChild;
    }
    if (rightChild < heapSize) {
      if (!await compare(largestIndex, rightChild, "Checking the right child in the heap.")) return false;
      if (values[rightChild] > values[largestIndex]) largestIndex = rightChild;
    }
    if (largestIndex === rootIndex) return true;
    if (!await swap(rootIndex, largestIndex, "Restoring the max-heap property.")) return false;
    return heapify(heapSize, largestIndex);
  }

  for (let index = Math.floor(values.length / 2) - 1; index >= 0; index--) {
    if (!await heapify(values.length, index)) return false;
  }
  for (let lastIndex = values.length - 1; lastIndex > 0; lastIndex--) {
    if (!await swap(0, lastIndex, `Moving the largest remaining value to position ${lastIndex + 1}.`)) return false;
    markSorted([lastIndex]);
    if (!await heapify(lastIndex, 0)) return false;
  }

  return true;
}
