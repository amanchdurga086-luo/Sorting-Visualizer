/** Sort values by recursively merging sorted halves. */
export async function mergeSort({ values, compare, write, isCancelled }) {
  async function sortRange(left, right) {
    if (isCancelled()) return false;
    if (left >= right) return true;

    const middle = Math.floor((left + right) / 2);
    if (!await sortRange(left, middle) || !await sortRange(middle + 1, right)) return false;

    return merge(left, middle, right);
  }

  async function merge(left, middle, right) {
    const leftPart = values.slice(left, middle + 1);
    const rightPart = values.slice(middle + 1, right + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let writeIndex = left;

    while (leftIndex < leftPart.length && rightIndex < rightPart.length) {
      if (!await compare(left + leftIndex, middle + 1 + rightIndex, "Comparing the front values of two sorted halves.")) return false;
      const value = leftPart[leftIndex] <= rightPart[rightIndex] ? leftPart[leftIndex++] : rightPart[rightIndex++];
      if (!await write(writeIndex++, value, `Merging ${value} back into the array.`)) return false;
    }

    while (leftIndex < leftPart.length) {
      const value = leftPart[leftIndex++];
      if (!await write(writeIndex++, value, `Merging ${value} back into the array.`)) return false;
    }

    while (rightIndex < rightPart.length) {
      const value = rightPart[rightIndex++];
      if (!await write(writeIndex++, value, `Merging ${value} back into the array.`)) return false;
    }

    return true;
  }

  return sortRange(0, values.length - 1);
}
