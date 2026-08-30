function solution(sizes) {
  let maxWidth = 0;
  let maxHeight = 0;

  for (let [w, h] of sizes) {
    const big = Math.max(w, h);
    const small = Math.min(w, h);

    maxWidth = Math.max(maxWidth, big);
    maxHeight = Math.max(maxHeight, small);
  }

  return maxWidth * maxHeight;
}
