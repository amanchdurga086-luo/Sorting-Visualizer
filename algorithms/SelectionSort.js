/** Sort values by selecting the smallest remaining value on each pass. */
export async function selectionSort({ values, compare, swap, markSorted }) {
  for (let currentIndex = 0; currentIndex < values.length - 1; currentIndex++) {
    let smallestIndex = currentIndex;

    for (let index = currentIndex + 1; index < values.length; index++) {
      if (!await compare(smallestIndex, index, "Looking for the smallest value in the unsorted section.")) return false;
      if (values[index] < values[smallestIndex]) smallestIndex = index;
    }

    if (smallestIndex !== currentIndex && !await swap(currentIndex, smallestIndex, `Placing the smallest value at position ${currentIndex + 1}.`)) return false;
    markSorted([currentIndex]);
  }

  return true;
}
