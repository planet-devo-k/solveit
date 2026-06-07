function solution(arr) {
  let X = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i]; j++) {
      X.push(arr[i]);
    }
  }
  return X;
}

// 다른 풀이
// function solution(arr) {
//     return arr.reduce((list, num) => [...list, ...new Array(num).fill(num)], []);
// }
