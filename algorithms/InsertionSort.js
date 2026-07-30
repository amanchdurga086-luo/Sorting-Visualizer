/** Sort values by inserting each value into the sorted left portion. */
export async function insertionSort({ values, compare, write, markSorted }) {
  for (let index = 1; index < values.length; index++) {
    const currentValue = values[index];
    let previousIndex = index - 1;

    while (previousIndex >= 0) {
      if (!await compare(previousIndex, previousIndex + 1, `Finding where ${currentValue} belongs in the sorted section.`)) return false;
      if (values[previousIndex] <= currentValue) break;
      if (!await write(previousIndex + 1, values[previousIndex], `Shifting ${values[previousIndex]} one position to the right.`)) return false;
      previousIndex--;
    }

    if (!await write(previousIndex + 1, currentValue, `Inserting ${currentValue} into its correct position.`)) return false;
    markSorted(Array.from({ length: index + 1 }, (_, sortedIndex) => sortedIndex));
  }

  return true;
}
