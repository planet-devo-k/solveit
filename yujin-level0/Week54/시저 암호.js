function solution(s, n) {
  let result = [];

  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);

    // 대문자 (A-Z: 65 ~ 90) 처리
    if (code >= 65 && code <= 90) {
      result.push(String.fromCharCode(((code - 65 + n) % 26) + 65));
    }
    // 소문자 (a-z: 97 ~ 122) 처리
    else if (code >= 97 && code <= 122) {
      // 0~25 기준 계산
      result.push(String.fromCharCode(((code - 97 + n) % 26) + 97));
    }
    // 공백 및 기타 문자
    else {
      result.push(s[i]);
    }
  }

  return result.join("");
}
