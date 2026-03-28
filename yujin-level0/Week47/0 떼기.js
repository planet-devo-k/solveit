function solution(n_str) {
  let str = "";
  let foundFirstNonZero = false;

  for (let i = 0; i < n_str.length; i++) {
    // 0이 아닌 숫자 처음 발견 & 그 자리가 0이 아닌 경우
    // 0이면 넘어가서 안 담기도록
    if (!foundFirstNonZero && n_str[i] !== "0") {
      foundFirstNonZero = true;
    }

    // 0이 아닌 숫자 처음 발견 이후 모든 문자 담기
    if (foundFirstNonZero) {
      str += n_str[i];
    }
  }

  return str;
}

// 다른 풀이
// function solution(n_str) {
//   return String(Number(n_str));
// }
