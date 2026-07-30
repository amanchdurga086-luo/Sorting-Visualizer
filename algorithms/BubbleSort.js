/** Sort values by repeatedly swapping adjacent out-of-order pairs. */
export async function bubbleSort({ values, compare, swap, markSorted }) {
  for (let lastIndex = values.length - 1; lastIndex > 0; lastIndex--) {
    let didSwap = false;

    for (let index = 0; index < lastIndex; index++) {
      if (!await compare(index, index + 1)) return false;

      if (values[index] > values[index + 1]) {
        if (!await swap(index, index + 1)) return false;
        didSwap = true;
      }
    }

    markSorted([lastIndex]);
    if (!didSwap) break;
  }

  return true;
}
