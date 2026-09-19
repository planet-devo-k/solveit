function solution(babbling) {
  const words = ["aya", "ye", "woo", "ma"];
  let count = 0;

  for (let text of babbling) {
    // 같은 발음이 연속되는지 확인
    if (
      text.includes("ayaaya") ||
      text.includes("yeye") ||
      text.includes("woowoo") ||
      text.includes("mama")
    ) {
      continue; // 연속 발음 탈락
    }

    // 발음할 수 있는 단어들을 공백(" ")으로 치환
    for (const word of words) {
      text = text.split(word).join(" ");
    }

    // 모든 공백을 없앤 결과가 빈 문자열이면 발음 성공
    if (text.split(" ").join("") === "") {
      count++;
    }
  }

  return count;
}

// 정규식 풀이
function solution(babbling) {
  // 연속 발음 패턴
  const repeatRegex = /(aya|ye|woo|ma)\1+/;
  // 발음 가능한 단어들로만 끝까지 이루어져 있는지 검사
  const validRegex = /^(aya|ye|woo|ma)+$/;

  return babbling.filter(
    (word) => !repeatRegex.test(word) && validRegex.test(word),
  ).length;
}
