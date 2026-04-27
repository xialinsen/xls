function defaultCompare(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function bubbleSort(input, compare = defaultCompare) {
  if (!Array.isArray(input)) {
    throw new TypeError('bubbleSort(input, compare?): input must be an array');
  }
  if (typeof compare !== 'function') {
    throw new TypeError('bubbleSort(input, compare?): compare must be a function');
  }

  const arr = input.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i += 1) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j += 1) {
      if (compare(arr[j], arr[j + 1]) > 0) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }

  return arr;
}

module.exports = { bubbleSort };
