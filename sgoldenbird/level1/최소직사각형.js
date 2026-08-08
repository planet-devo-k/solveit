function solution(sizes) {
  let longSide = 0;
  let shortSide = 0;
  for (const size of sizes) {
    size.sort((a, b) => a - b);
    if (longSide < size[0]) {
      longSide = size[0];
    }
    if (shortSide < size[1]) {
      shortSide = size[1];
    }
  }
  return longSide * shortSide;
}
