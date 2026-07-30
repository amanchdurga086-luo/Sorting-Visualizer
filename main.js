import { sortingAlgorithms } from "./algorithms/index.js";
import { clearBarColors, drawBars, markBarsSorted } from "./services/ArrayRenderer.js";
import { createSortingOperations } from "./services/SortingOperations.js";
import { createStatistics } from "./services/Statistics.js";
import { loadTheme, toggleTheme } from "./services/ThemeManager.js";

const elements = {
  arrayContainer: document.getElementById("arrayContainer"),
  algorithmSelect: document.getElementById("algorithmSelect"),
  sizeSlider: document.getElementById("sizeSlider"),
  speedSlider: document.getElementById("speedSlider"),
  sizeValue: document.getElementById("sizeValue"),
  speedValue: document.getElementById("speedValue"),
  startButton: document.getElementById("startButton"),
  pauseButton: document.getElementById("pauseButton"),
  resetButton: document.getElementById("resetButton"),
  newArrayButton: document.getElementById("newArrayButton"),
  themeToggle: document.getElementById("themeToggle"),
  statusText: document.getElementById("statusText"),
  visualizerTitle: document.getElementById("visualizerTitle"),
  algorithmName: document.getElementById("algorithmName"),
  algorithmDescription: document.getElementById("algorithmDescription"),
  codeContainer: document.getElementById("codeContainer"),
  bestComplexity: document.getElementById("bestComplexity"),
  averageComplexity: document.getElementById("averageComplexity"),
  worstComplexity: document.getElementById("worstComplexity"),
  spaceComplexity: document.getElementById("spaceComplexity"),
  comparisonCount: document.getElementById("comparisonCount"),
  swapCount: document.getElementById("swapCount"),
  elapsedTime: document.getElementById("elapsedTime"),
  actionMessage: document.getElementById("actionMessage"),
  explanationText: document.getElementById("explanationText")
};

const speedLabels = ["", "Very slow", "Slow", "Medium", "Fast", "Very fast"];
const statistics = createStatistics(elements.comparisonCount, elements.swapCount, elements.elapsedTime);

let arrayValues = [];
let originalArray = [];
let isSorting = false;
let isPaused = false;
let shouldStopSorting = false;
let currentRun = 0;
let startTime = 0;
let timerFrame;
let pauseStartedAt = 0;

function updateMessage(message) {
  elements.actionMessage.textContent = message;
  elements.explanationText.textContent = message;
}

function updateStatus(message, isBusy) {
  elements.statusText.innerHTML = `<span></span> ${message}`;
  elements.statusText.classList.toggle("is-busy", isBusy);
}

function generateArray() {
  stopCurrentSort();
  arrayValues = Array.from(
    { length: Number(elements.sizeSlider.value) },
    () => Math.floor(Math.random() * 88) + 12
  );
  originalArray = [...arrayValues];
  statistics.reset();
  drawBars(elements.arrayContainer, arrayValues);
  updateMessage("A new random array is ready. Press Start sorting to visualize the algorithm.");
  updateStatus("Ready to sort", false);
}

function updateAlgorithmInfo() {
  const algorithm = sortingAlgorithms[elements.algorithmSelect.value];
  elements.visualizerTitle.textContent = algorithm.name;
  elements.algorithmName.textContent = algorithm.name;
  elements.algorithmDescription.textContent = algorithm.description;
  elements.codeContainer.textContent = algorithm.code;
  elements.bestComplexity.textContent = algorithm.complexity.best;
  elements.averageComplexity.textContent = algorithm.complexity.average;
  elements.worstComplexity.textContent = algorithm.complexity.worst;
  elements.spaceComplexity.textContent = algorithm.complexity.space;
  clearBarColors(elements.arrayContainer);
  updateMessage(algorithm.intro);
}

function setSortingControls(disabled) {
  elements.startButton.disabled = disabled;
  elements.pauseButton.disabled = !disabled;
  elements.algorithmSelect.disabled = disabled;
  elements.sizeSlider.disabled = disabled;
}

function setPauseButtonText(isResume) {
  elements.pauseButton.innerHTML = isResume
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z"/></svg> Resume'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14M17 5v14"/></svg> Pause';
}

function updateTimer() {
  if (!isSorting) return;
  if (!isPaused) statistics.setTime(performance.now() - startTime);
  timerFrame = requestAnimationFrame(updateTimer);
}

function getSortingOperations() {
  return createSortingOperations(
    arrayValues,
    elements.arrayContainer,
    statistics,
    elements.speedSlider,
    () => isPaused,
    () => shouldStopSorting,
    updateMessage
  );
}

async function startSorting() {
  if (isSorting) return;

  isSorting = true;
  isPaused = false;
  shouldStopSorting = false;
  const runNumber = ++currentRun;
  statistics.reset();
  startTime = performance.now();
  updateTimer();
  setSortingControls(true);
  setPauseButtonText(false);
  updateStatus("Sorting in progress", true);

  const algorithm = sortingAlgorithms[elements.algorithmSelect.value];
  updateMessage(`${algorithm.name} has started.`);
  const completed = await algorithm.sort(getSortingOperations());

  if (shouldStopSorting || runNumber !== currentRun || !completed) return;

  isSorting = false;
  cancelAnimationFrame(timerFrame);
  statistics.setTime(performance.now() - startTime);
  clearBarColors(elements.arrayContainer);
  const sortedIndexes = [];

  for (let index = 0; index < arrayValues.length; index++) {
    sortedIndexes.push(index);
  }

  markBarsSorted(elements.arrayContainer, sortedIndexes);
  setSortingControls(false);
  updateStatus("Sorting complete", false);
  updateMessage(`Complete - ${algorithm.name} sorted ${arrayValues.length} values in ${statistics.getTime().toFixed(2)} ms.`);
}

function togglePause() {
  if (!isSorting) return;

  isPaused = !isPaused;
  setPauseButtonText(isPaused);
  if (isPaused) {
    pauseStartedAt = performance.now();
    updateStatus("Animation paused", false);
    updateMessage("Animation paused. Press Resume whenever you are ready.");
    return;
  }

  startTime += performance.now() - pauseStartedAt;
  updateStatus("Sorting in progress", true);
  updateMessage("Sorting resumed.");
}

function stopCurrentSort() {
  shouldStopSorting = true;
  currentRun++;
  isSorting = false;
  isPaused = false;
  cancelAnimationFrame(timerFrame);
  setSortingControls(false);
  setPauseButtonText(false);
}

function resetArray() {
  stopCurrentSort();
  arrayValues = [...originalArray];
  statistics.reset();
  drawBars(elements.arrayContainer, arrayValues);
  updateMessage("Array reset to its original order.");
  updateStatus("Ready to sort", false);
}

function updateSizeLabel() {
  elements.sizeValue.textContent = elements.sizeSlider.value;
  generateArray();
}

function updateSpeedLabel() {
  elements.speedValue.textContent = speedLabels[Number(elements.speedSlider.value)];
}

elements.algorithmSelect.addEventListener("change", updateAlgorithmInfo);
elements.sizeSlider.addEventListener("input", updateSizeLabel);
elements.speedSlider.addEventListener("input", updateSpeedLabel);
elements.startButton.addEventListener("click", startSorting);
elements.pauseButton.addEventListener("click", togglePause);
elements.newArrayButton.addEventListener("click", generateArray);
elements.resetButton.addEventListener("click", resetArray);
elements.themeToggle.addEventListener("click", () => toggleTheme(elements.themeToggle));

loadTheme(elements.themeToggle);
updateSpeedLabel();
generateArray();
updateAlgorithmInfo();
