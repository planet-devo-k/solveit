function solution(box, n) {
  const [w, h, l] = box;
  return Math.floor(w / n) * Math.floor(h / n) * Math.floor(l / n);
}
