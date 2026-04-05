function solution(box, n) {
  const x = Math.floor(box[0] / n);
  const y = Math.floor(box[1] / n);
  const z = Math.floor(box[2] / n);
  return x * y * z;
}
