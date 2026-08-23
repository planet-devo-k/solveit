function solution(i, j, k) {
  let str = "";
  for (let num = i; num <= j; num++) {
    str += num;
  }

  return str.split(String(k)).length - 1;
}

// 다른 풀이
// function solution(i, j, k) {
//     return Array(j-i+1).fill(i).map((v,i)=>v+i).join('').split(k).length-1;
// }
