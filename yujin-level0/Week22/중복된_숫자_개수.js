function solution(array, n) {
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === n) {
      newArr.push(array[i]);
    }
  }
  return newArr.length;
}

// 다른 풀이
// function solution(array, n) {
//   return array.filter(a => a === n).length;
// }