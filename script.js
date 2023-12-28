
let originalBars = [];
let bars = [];


const chart = document.getElementById('chart');

function generateRandomBars() {
  originalBars = [];
  for (let i = 0; i < 25; i++) {
    originalBars.push(Math.floor(Math.random() * 100) + 1);
  }
  bars = [...originalBars];
}

function drawBars() {
  chart.innerHTML = '';
  const minHeight = 5; // Minimum height for bars

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');

    // Set the height, ensuring a minimum height for visibility
    const height = bars[i] > 0 ? bars[i] : minHeight;
    bar.style.height = height + 'px';

    chart.appendChild(bar);
  }
}

function randomizeBars() {
  generateRandomBars();
  drawBars();
}

function insertionSort() {
  let currentBars = [...bars]; // Create a copy of bars to sort
  console.log('Before insertion sort', currentBars);
  for (let i = 1; i < currentBars.length; i++) {
    let current = currentBars[i];
    let j = i - 1;

    while (j >= 0 && currentBars[j] > current) {
      currentBars[j + 1] = currentBars[j];
      j--;
    }

    currentBars[j + 1] = current;
  }

  bars = [...currentBars]; // Assign the sorted result back to 'bars'
  console.log('After insertion sort', bars);
  drawBars(); // Update the chart with sorted bars
  bars = [...originalBars]; // Assign original array for sorting by other algorithms
  
}

function bubbleSort() {
  console.log('Before bubble sort', bars);
  let currentBars = [...bars]; // Create a copy of bars to sort
  const n = currentBars.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (currentBars[j] > currentBars[j + 1]) {
        // Swap currentBars[j] and currentBars[j + 1]
        let temp = currentBars[j];
        currentBars[j] = currentBars[j + 1];
        currentBars[j + 1] = temp;
      }
    }
  } 
  bars = [...currentBars]; // Assign the sorted result back to 'bars'
  console.log('After bubble sort', bars);
  drawBars(); // Update the chart with sorted bars
  bars = [...originalBars]; // Assign original array for sorting by other algorithms

  

}

function selectionSort() {
  console.log('Before selection sort', bars);
  let currentBars = [...bars];
  const n = currentBars.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (currentBars[j] < currentBars[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap bars[i] and bars[minIndex]
      let temp = currentBars[i];
      currentBars[i] = currentBars[minIndex];
      currentBars[minIndex] = temp;
    }
  }

  bars = [...currentBars]; // Assign the sorted result back to 'bars'
  console.log('After selection sort', bars);
  drawBars(); // Update the chart with sorted bars
  bars = [...originalBars];// Assign original array for sorting by other algorithms

}

function mergeSort() {
  console.log('Before merge sort', bars);
  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge left and right arrays into the result array
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Concatenate the remaining elements from left and right arrays
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  function mergeSortUtil(arr) {
    const len = arr.length;

    if (len <= 1) {
      return arr;
    }

    const middle = Math.floor(len / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSortUtil(left), mergeSortUtil(right));
  }

  bars = mergeSortUtil(bars); // Sort the 'bars' array using merge sort
  console.log('After merge Sort:', bars);
  drawBars();
  bars = [...originalBars];// Assign original array for sorting by other algorithms
}

function quickSort() {
  console.log('Before quick Sort:', bars);
  function partition(low, high) {
    const pivot = bars[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (bars[j] < pivot) {
        i++;
        // Swap bars[i] and bars[j]
        let temp = bars[i];
        bars[i] = bars[j];
        bars[j] = temp;
      }
    }

    // Swap bars[i + 1] and bars[high] (pivot element)
    let temp = bars[i + 1];
    bars[i + 1] = bars[high];
    bars[high] = temp;

    return i + 1;
  }

  function quickSortUtil(low, high) {
    if (low < high) {
      const pi = partition(low, high);

      quickSortUtil(low, pi - 1); // Sort elements before partition
      quickSortUtil(pi + 1, high); // Sort elements after partition
    }
  }

  quickSortUtil(0, bars.length - 1); // Sort the 'bars' array using quick sort
  console.log('After quick Sort:', bars);
  drawBars();
  bars = [...originalBars];// Assign original array for sorting by other algorithms
}

function shellSort() {
  console.log('Before shell sort', bars);
  const n = bars.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = bars[i];
      let j = i;

      while (j >= gap && bars[j - gap] > temp) {
        bars[j] = bars[j - gap];
        j -= gap;
      }

      bars[j] = temp;
    }
  }
  console.log('After shell Sort:', bars);
  drawBars();
  bars = [...originalBars];// Assign original array for sorting by other algorithms
}

function changeSize() {
  const newSize = document.getElementById('sizeRange').value;
  const maxHeight = 900; // Maximum height for bars to fit within the screen
  const minHeight = 5; // Minimum height for bars

  // Find the maximum value in the bars array
  const maxBarValue = Math.max(...bars);

  for (let i = 0; i < bars.length; i++) {
    // Calculate the new height for each bar proportionally based on the maximum value
    let newHeight = (bars[i] / maxBarValue) * newSize;

    // Limit the maximum height to fit within the visible area
    newHeight = Math.min(newHeight, maxHeight);

    // Ensure a minimum height for visibility
    bars[i] = newHeight > minHeight ? newHeight : minHeight;
  }

  drawBars();

}


// Initialize with random bars
randomizeBars();
drawBars();
