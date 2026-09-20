function solution(ingredient) {
  const stack = [];
  let count = 0;

  for (const item of ingredient) {
    stack.push(item);
    const n = stack.length;

    if (
      n >= 4 &&
      stack[n - 4] === 1 &&
      stack[n - 3] === 2 &&
      stack[n - 2] === 3 &&
      stack[n - 1] === 1
    ) {
      stack.length -= 4;
      count++;
    }
  }

  return count;
}
