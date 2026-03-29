function solution(myString, pat) {
  let answer = "";
  for (let char of myString) {
    answer += char === "A" ? "B" : "A";
  }

  return answer.includes(pat) ? 1 : 0;
}

// 다른 풀이
// function solution(myString, pat) {
//     return myString.split("").map(char => char === "A" ? "B" : "A").join("").includes(pat) ? 1 : 0
// }
// split는 문자열 -> 배열
// split와 map은 짝꿍
// join은 배열 -> 문자열
