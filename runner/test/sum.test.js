const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test('bad test', () => {
  expect(sum(1, 2)).toBe(4);
});

test('bad test again', () => {
  expect(sum(1, 8)).toBe(10);
});
