// https://school.programmers.co.kr/learn/courses/30/lessons/120887

function solution(i, j, k) {
  // 방법 1) 각 숫자를 문자열로 변환하여 k의 등장 횟수를 누적
  let count = 0;
  for (; i <= j; i++) {
    count += String(i)
      .split('')
      .filter((num) => num === String(k)).length;
  }
  return count;

  // 방법 2) i~j를 하나의 문자열로 합친 뒤, k를 기준으로 나눈 횟수로 등장 개수 계산
  //     const numbers = Array.from({length: j - i + 1}, (_, idx) => i + idx)
  //                 .join("");
  //     return numbers.split(k).length - 1;
}
