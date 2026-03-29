function solution(my_string) {
  return [...my_string]
    .filter((char) => !isNaN(char) && char !== " ") // 숫자 문자인지 확인 (공백 제외)
    .reduce((acc, char) => acc + Number(char), 0); // 모두 숫자로 변환하여 누적 합산
}

// 다른 풀이
// function solution(my_string) {
//   // 1. 문자열에서 숫자가 아닌 모든 문자(a-z, A-Z)를 공백으로 치환
//   // 2. 공백을 기준으로 문자열을 분리 (split)
//   // 3. 빈 문자열을 걸러내고, 남은 숫자 문자열을 모두 숫자로 변환하여 합산

//   return my_string
//     .replace(/[a-zA-Z]/g, " ") // 문자를 공백으로 치환
//     .split(" ")                // 공백 기준으로 분리
//     .filter((v) => v !== '')   // 빈 문자열 제거
//     .map(Number)               // 숫자 배열로 변환
//     .reduce((acc, cur) => acc + cur, 0); // 모두 더함
// }
