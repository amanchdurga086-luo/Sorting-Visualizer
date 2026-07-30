// Functions used to draw and update the bars on the screen.
function getBar(arrayContainer, index) {
  return arrayContainer.children[index];
}

function getBarHeight(value, biggestValue) {
  let height = (value / biggestValue) * 100;

  if (height < 3) {
    height = 3;
  }

  return height;
}

export function drawBars(arrayContainer, arrayValues) {
  arrayContainer.innerHTML = "";

  const biggestValue = Math.max(...arrayValues, 1);

  for (let index = 0; index < arrayValues.length; index++) {
    const bar = document.createElement("div");
    const label = document.createElement("span");
    const value = arrayValues[index];

    bar.className = "bar";
    bar.dataset.index = index;
    bar.style.height = `${getBarHeight(value, biggestValue)}%`;
    bar.setAttribute("aria-label", `Value ${value}`);

    label.className = "bar-value";
    label.textContent = value;
    bar.appendChild(label);
    arrayContainer.appendChild(bar);
  }
}

export function clearBarColors(arrayContainer) {
  const bars = arrayContainer.children;

  for (let index = 0; index < bars.length; index++) {
    bars[index].className = "bar";
  }
}

export function colorBars(arrayContainer, indexes, colorClass) {
  for (let index = 0; index < indexes.length; index++) {
    const bar = getBar(arrayContainer, indexes[index]);

    if (bar) {
      bar.classList.add(colorClass);
    }
  }
}

export function markBarsSorted(arrayContainer, indexes) {
  colorBars(arrayContainer, indexes, "is-sorted");
}

export function updateBar(arrayContainer, arrayValues, index) {
  const bar = getBar(arrayContainer, index);

  if (!bar) {
    return;
  }

  const biggestValue = Math.max(...arrayValues, 1);
  bar.style.height = `${getBarHeight(arrayValues[index], biggestValue)}%`;
  bar.querySelector(".bar-value").textContent = arrayValues[index];
}
