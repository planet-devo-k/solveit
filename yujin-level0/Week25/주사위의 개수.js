function solution(box, n) {
  return parseInt(box[0] / n) * parseInt(box[1] / n) * parseInt(box[2] / n);
}

// 다른 풀이
// function solution(box, n) {
//     let [width, length, height] = box;

//     return Math.floor(width / n) * Math.floor(length / n) * Math.floor(height / n);
// }

// 다른 풀이 2
// function solution(box, n) {
//     return box.reduce((acc,v) => acc * Math.floor(v / n), 1);
// }
