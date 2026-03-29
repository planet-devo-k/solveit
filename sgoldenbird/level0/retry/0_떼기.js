// https://school.programmers.co.kr/learn/courses/30/lessons/181847

function solution(n_str) {
  let arr = n_str.split("");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "0") {
      arr.splice(i, 1);
      i--;
    } else {
      break;
    }
  }
  return arr.join("");
}
