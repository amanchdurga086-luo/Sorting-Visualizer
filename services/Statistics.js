// Keeps the comparison, swap/write and time values for the current sort.
export function createStatistics(comparisonCount, swapCount, elapsedTime) {
  let comparisons = 0;
  let swaps = 0;
  let totalTime = 0;

  function showStatistics() {
    comparisonCount.textContent = comparisons.toLocaleString();
    swapCount.textContent = swaps.toLocaleString();
    elapsedTime.textContent = `${totalTime.toFixed(2)} ms`;
  }

  return {
    reset() {
      comparisons = 0;
      swaps = 0;
      totalTime = 0;
      showStatistics();
    },

    addComparison() {
      comparisons++;
      showStatistics();
    },

    addSwap() {
      swaps++;
      showStatistics();
    },

    setTime(time) {
      totalTime = time;
      showStatistics();
    },

    getTime() {
      return totalTime;
    }
  };
}
