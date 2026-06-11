// ARRAY + BARS
let arr = [];
let bars = [];


// HTML ELEMENTS
const arrayContainer = document.getElementById("arrayContainer");

const startBtn = document.getElementById("startBtn");

const newArrBtn = document.getElementById("newArrBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

const explanationText = document.getElementById("explanationText");

const comparisonCount = document.getElementById("comparisonCount");

const swapCount = document.getElementById("swapCount");

const codeContainer = document.getElementById("codeContainer");

const algoSelect = document.getElementById("algo");

const timeComplexity = document.getElementById("timeComplexity");

const spaceComplexity = document.getElementById("spaceComplexity");


// VARIABLES
let comparisons = 0;

let swaps = 0;

let isPaused = false;

let stopSorting = false;

let isSorting = false;

let currentSession = 0;


// CODE LINES


const bubbleCode = [
    "for(let i = 0; i < n; i++):",
    "  for(let j = 0; j < n-i-1; j++):",
    "    if(arr[j] > arr[j+1])",
    "    swap(arr[j], arr[j+1])"
];

const quickCode = [
    "quickSort(array, low, high):",
    "  if low < high then",
    "    pivotIndex = partition(array, low, high)",
    "    quickSort(array, low, pivotIndex - 1)",
    "    quickSort(array, pivotIndex + 1, high)",
        "    ",
    "partition(array, low, high):",
    "  i = left + 1",
    "  j = right",
    "  while(i <= j)",
    "    while(i <= right && arr[pivot] >= arr[i])",
    "      i++;",
    "    while(j >= left+1 && arr[pivot] < arr[j])",
    "      j--;",
    "    if(i < j)",
    "      swap(arr[i], arr[j])",
    "  swap(arr[pivot], arr[j])",
    "  return j;"    
];

const mergeCode = [
    "mergeSort(A, left, right):",
    "  if left < right:",
    "    mid = (left + right) / 2",
    "    mergeSort(A, left, mid)",
    "    mergeSort(A, mid + 1, right)",
    "    merge(A, left, mid, right)"
];


// RENDER CODE
function renderCode()
{
    codeContainer.innerHTML = "";

    let selectedAlgo = algoSelect.value;

    let selectedCode = [];

    if(selectedAlgo === "Bubble Sort")
    {
        selectedCode = bubbleCode;
        timeComplexity.innerText = "O(n²)";
        spaceComplexity.innerText = "O(1)";
    }

    else if(selectedAlgo === "Quick Sort")
    {
        selectedCode = quickCode;
        timeComplexity.innerText = "O(n²)";
        spaceComplexity.innerText = "O(log n)";

    }

    else if(selectedAlgo === "Merge Sort")
    {
        selectedCode = mergeCode;
        timeComplexity.innerText = "O(n log n)";
        spaceComplexity.innerText = "O(n)";

    }

    selectedCode.forEach((line, idx) => {

        let p = document.createElement("p");

        p.innerText = line;

        p.id = `line-${idx}`;

        codeContainer.appendChild(p);
    });
}


// EXPLAIN
function explain(text)
{
    explanationText.innerText = text;
}


// UPDATE STATS
function updateStats()
{
    comparisonCount.innerText = comparisons;

    swapCount.innerText = swaps;
}


// GENERATE ARRAY
function generateArray()
{
    arr = [];

    arrayContainer.innerHTML = "";

    for(let i = 0; i < 10; i++)
    {
        let value = Math.floor(Math.random() * 250) + 20;

        arr.push(value);

        let bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = `${value}px`;

        bar.innerText = value;

        arrayContainer.appendChild(bar);
    }

    bars = document.getElementsByClassName("bar");

    comparisons = 0;

    swaps = 0;

    updateStats();
}


// UPDATE BAR
function updateBar(index, value, color = "#60a5fa")
{
    if(!bars[index]) return;

    bars[index].style.height = `${value}px`;

    bars[index].style.background = color;

    bars[index].innerText = value;
}


// SLEEP
function sleep(ms)
{
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


// PAUSE CHECK
async function checkPaused(session)
{
    while(isPaused)
    {
        if(stopSorting || session !== currentSession)
        {
            return true;
        }

        await sleep(100);
    }

    return stopSorting || session !== currentSession;
}


// BUBBLE SORT
async function bubbleSort(session)
{
    let n = arr.length;

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n-i-1; j++)
        {
            if(stopSorting || session !== currentSession)
                return;

            if(await checkPaused(session))
                return;

            comparisons++;

            updateStats();

            updateBar(j, arr[j], "red");

            updateBar(j+1, arr[j+1], "red");

            explain(`Comparing ${arr[j]} and ${arr[j+1]}`);

            await sleep(300);

            if(stopSorting || session !== currentSession)
                return;

            if(arr[j] > arr[j+1])
            {
                swaps++;

                updateStats();

                explain(`Swapping ${arr[j]} and ${arr[j+1]}`);

                updateBar(j, arr[j], "purple");

                updateBar(j+1, arr[j+1], "purple");

                await sleep(300);

                if(stopSorting || session !== currentSession)
                    return;

                [arr[j], arr[j+1]] =
                [arr[j+1], arr[j]];

                updateBar(j, arr[j], "purple");

                updateBar(j+1, arr[j+1], "purple");

                await sleep(300);

                if(stopSorting || session !== currentSession)
                    return;
            }

            updateBar(j, arr[j]);

            updateBar(j+1, arr[j+1]);
        }

        updateBar(n-i-1, arr[n-i-1], "green");
    }

    explain("Sorting Completed!");
}


// QUICK SORT
async function partitionArr(left, right, session)
{
    let pivot = left;
    explain(`Pivot selected: ${arr[pivot]}`);

    updateBar(pivot, arr[pivot], "yellow");

    let i = left + 1;

    let j = right;

    while(i <= j)
    {
        if(stopSorting || session !== currentSession)
            return;

        while(i <= right && arr[pivot] >= arr[i])
        {
            if(await checkPaused(session))
                return;

            comparisons++;

            updateStats();
            explain(`Comparing ${arr[i]} with pivot ${arr[pivot]}`);

            updateBar(i, arr[i], "red");

            await sleep(200);

            if(stopSorting || session !== currentSession)
                return;

            updateBar(i, arr[i]);

            i++;
        }

        while(j >= left+1 && arr[pivot] < arr[j])
        {
            if(await checkPaused(session))
                return;

            comparisons++;

            updateStats();
            explain(`Comparing ${arr[j]} with pivot ${arr[pivot]}`);

            updateBar(j, arr[j], "red");

            await sleep(200);

            if(stopSorting || session !== currentSession)
                return;

            updateBar(j, arr[j]);

            j--;
        }

        if(i < j)
        {
            swaps++

            updateStats();
            explain(`Swapping ${arr[i]} and ${arr[j]}`);

            [arr[i], arr[j]] =
            [arr[j], arr[i]];

            updateBar(i, arr[i], "purple");

            updateBar(j, arr[j], "purple");

            await sleep(300);

            if(stopSorting || session !== currentSession)
                return;

            updateBar(i, arr[i]);

            updateBar(j, arr[j]);
        }
    }
    explain(`Placing pivot ${arr[pivot]} at correct position`);

    swaps++;

    updateStats();
    [arr[pivot], arr[j]] =
    [arr[j], arr[pivot]];

    updateBar(pivot, arr[pivot]);

    updateBar(j, arr[j], "green");

    await sleep(300);

    return j;
}

async function quickSort(left, right, session)
{
    if(stopSorting || session !== currentSession)
        return;

    if(left >= right)
    {
        if(left >= 0 && left < arr.length)
        {
            updateBar(left, arr[left], "green");
        }

        return;
    }

    let pivot = await partitionArr(left, right, session);

    if(stopSorting || session !== currentSession)
        return;

    await quickSort(left, pivot-1, session);

    if(stopSorting || session !== currentSession)
        return;

    await quickSort(pivot+1, right, session);
}

async function startQuickSort(session)
{
    await quickSort(0, arr.length-1, session);
}


// MERGE SORT
async function merge(start, mid, end, session)
{
    let dummy = [];

    let i = start;

    let j = mid + 1;

    while(i <= mid && j <= end)
    {
        if(stopSorting || session !== currentSession)
            return;

        if(await checkPaused(session))
            return;

        comparisons++;

        updateStats();
        explain(`Comparing ${arr[i]} and ${arr[j]}`);
        updateBar(i, arr[i], "orange");

        updateBar(j, arr[j], "yellow");

        await sleep(200);

        if(arr[i] < arr[j])
        {
            explain(`${arr[i]} is smaller, adding into merged array`);
            dummy.push(arr[i]);

            i++;
        }
        else
        {
            explain(`${arr[j]} is smaller, adding into merged array`);
            dummy.push(arr[j]);

            j++;
        }
    }

    while(i <= mid)
    {
        dummy.push(arr[i]);

        i++;
    }

    while(j <= end)
    {
        dummy.push(arr[j]);

        j++;
    }

    for(let k = start; k <= end; k++)
    {
        if(stopSorting || session !== currentSession)
            return;

        explain(`Writing ${dummy[k-start]} into main array`);
        arr[k] = dummy[k-start];

        updateBar(k, arr[k], "purple");

        await sleep(150);

        updateBar(k, arr[k]);
    }
}

async function solve(start, end, session)
{
    if(stopSorting || session !== currentSession)
        return;

    if(start >= end)
        return;

    let mid =
    Math.floor(start + (end-start)/2);

    explain(`Dividing array from index ${start} to ${end}`);
    await solve(start, mid, session);

    if(stopSorting || session !== currentSession)
        return;

    await solve(mid+1, end, session);

    if(stopSorting || session !== currentSession)
        return;

    explain(`now merging index ${start} to ${mid} and ${mid+1} to ${end}`);
    await merge(start, mid, end, session);
}

async function startMergeSort(session)
{
    await solve(0, arr.length-1, session);

    for(let i = 0; i < arr.length; i++)
    {
        updateBar(i, arr[i], "green");
    }
}


// PAUSE BUTTON
pauseBtn.addEventListener("click", () => {

    if(!isSorting) return;

    isPaused = !isPaused;

    pauseBtn.innerText =
    isPaused ? "Resume" : "Pause";
});


// RESET BUTTON
resetBtn.addEventListener("click", () => {

    stopSorting = true;

    currentSession++;

    isPaused = false;

    isSorting = false;

    pauseBtn.innerText = "Pause";

    startBtn.disabled = false;

    generateArray();

    explain("Array Reset Successfully!");

    setTimeout(() => {

        stopSorting = false;

    }, 100);
});


// NEW ARRAY BUTTON
newArrBtn.addEventListener("click", () => {

    stopSorting = true;

    currentSession++;

    isPaused = false;

    isSorting = false;

    pauseBtn.innerText = "Pause";

    startBtn.disabled = false;

    generateArray();

    explain("New Array Generated!");

    setTimeout(() => {

        stopSorting = false;

    }, 100);
});


// START BUTTON
startBtn.addEventListener("click", async () => {

    if(isSorting) return;

    isSorting = true;

    stopSorting = false;

    startBtn.disabled = true;

    currentSession++;

    let session = currentSession;

    let selectedAlgo = algoSelect.value;

    if(selectedAlgo === "Bubble Sort")
    {
        await bubbleSort(session);
    }

    else if(selectedAlgo === "Quick Sort")
    {
        await startQuickSort(session);
    }

    else if(selectedAlgo === "Merge Sort")
    {
        await startMergeSort(session);
    }

    if(session !== currentSession)
        return;

    isSorting = false;

    startBtn.disabled = false;
});


algoSelect.addEventListener("change", () => {

    renderCode();

});

generateArray();