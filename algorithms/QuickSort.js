/** Sort values by partitioning around a pivot. */
export async function quickSort({ values, compare, swap, markSorted, message, isCancelled }) {
  async function sortRange(low, high) {
    if (isCancelled()) return false;
    if (low >= high) return true;

    const pivotIndex = await partition(low, high);
    if (pivotIndex === -1) return false;

    markSorted([pivotIndex]);
    return (await sortRange(low, pivotIndex - 1)) && sortRange(pivotIndex + 1, high);
  }

  async function partition(low, high) {
    const pivotValue = values[high];
    let smallerValueIndex = low;
    message(`Using ${pivotValue} as the pivot.`);

    for (let index = low; index < high; index++) {
      if (!await compare(index, high, `Comparing ${values[index]} with pivot ${pivotValue}.`)) return -1;
      if (values[index] <= pivotValue) {
        if (index !== smallerValueIndex && !await swap(index, smallerValueIndex)) return -1;
        smallerValueIndex++;
      }
    }

    if (smallerValueIndex !== high && !await swap(smallerValueIndex, high, `Placing pivot ${pivotValue} in its final position.`)) return -1;
    return smallerValueIndex;
  }

  return sortRange(0, values.length - 1);
}
