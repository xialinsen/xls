const assert = require('node:assert/strict');
const { bubbleSort } = require('./bubbleSort');

function testDefaultAscending() {
  const input = [3, 1, 2];
  const output = bubbleSort(input);
  assert.deepEqual(output, [1, 2, 3]);
  assert.deepEqual(input, [3, 1, 2]);
}

function testCustomComparatorObjects() {
  const input = [{ n: 2 }, { n: 1 }, { n: 3 }];
  const output = bubbleSort(input, (a, b) => a.n - b.n);
  assert.deepEqual(output, [{ n: 1 }, { n: 2 }, { n: 3 }]);
  assert.deepEqual(input, [{ n: 2 }, { n: 1 }, { n: 3 }]);
}

function testEarlyExit() {
  const input = [1, 2, 3, 4, 5];
  let compareCount = 0;
  const output = bubbleSort(input, (a, b) => {
    compareCount += 1;
    return a - b;
  });

  assert.deepEqual(output, [1, 2, 3, 4, 5]);
  assert.equal(compareCount, input.length - 1);
}

function main() {
  testDefaultAscending();
  testCustomComparatorObjects();
  testEarlyExit();
  console.log('bubbleSort demo: all checks passed');
}

main();
