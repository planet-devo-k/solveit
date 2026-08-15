function solution(sizes) {
  let maxWidth = 0;
  let maxHeight = 0;

  sizes.forEach(([w, h]) => {
    let max = Math.max(w, h);
    let min = Math.min(w, h);

    maxWidth = Math.max(maxWidth, max);
    maxHeight = Math.max(maxHeight, min);
  });

  return maxWidth * maxHeight;
}

// 다른 풀이
// function solution(sizes) {
//     const [hor, ver] = sizes.reduce(([h, v], [a, b]) => [Math.max(h, Math.max(a, b)), Math.max(v, Math.min(a, b))], [0, 0])
//     return hor * ver;
// }
