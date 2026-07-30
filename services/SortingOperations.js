import { clearBarColors, colorBars, markBarsSorted, updateBar } from "./ArrayRenderer.js";

function sleep(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

// Gives every algorithm the common functions it needs for animation.
export function createSortingOperations(arrayValues, arrayContainer, statistics, speedSlider, isPaused, shouldStopSorting, updateMessage) {
  async function waitForAnimation() {
    while (isPaused() && !shouldStopSorting()) {
      await sleep(50);
    }

    if (shouldStopSorting()) {
      return false;
    }

    const delay = 460 - Number(speedSlider.value) * 76;
    await sleep(delay);

    return !shouldStopSorting();
  }

  async function compareBars(firstIndex, secondIndex, message) {
    clearBarColors(arrayContainer);
    colorBars(arrayContainer, [firstIndex, secondIndex], "is-active");
    statistics.addComparison();

    if (message) {
      updateMessage(message);
    } else {
      updateMessage(`Comparing ${arrayValues[firstIndex]} and ${arrayValues[secondIndex]}.`);
    }

    return waitForAnimation();
  }

  async function swapBars(firstIndex, secondIndex, message) {
    clearBarColors(arrayContainer);
    colorBars(arrayContainer, [firstIndex, secondIndex], "is-swapping");

    const temporaryValue = arrayValues[firstIndex];
    arrayValues[firstIndex] = arrayValues[secondIndex];
    arrayValues[secondIndex] = temporaryValue;
    statistics.addSwap();

    updateBar(arrayContainer, arrayValues, firstIndex);
    updateBar(arrayContainer, arrayValues, secondIndex);

    if (message) {
      updateMessage(message);
    } else {
      updateMessage(`Swapping ${arrayValues[firstIndex]} and ${arrayValues[secondIndex]}.`);
    }

    return waitForAnimation();
  }

  async function writeBar(index, value, message) {
    clearBarColors(arrayContainer);
    colorBars(arrayContainer, [index], "is-swapping");
    arrayValues[index] = value;
    statistics.addSwap();
    updateBar(arrayContainer, arrayValues, index);

    if (message) {
      updateMessage(message);
    } else {
      updateMessage(`Writing ${value} into position ${index + 1}.`);
    }

    return waitForAnimation();
  }

  return {
    values: arrayValues,
    compare: compareBars,
    swap: swapBars,
    write: writeBar,
    markSorted(indexes) {
      markBarsSorted(arrayContainer, indexes);
    },
    message: updateMessage,
    isCancelled: shouldStopSorting
  };
}
