function solution(absolutes, signs) {
  let answer = 0;
  signs.forEach((item, idx) => {
    item ? (answer += absolutes[idx]) : (answer += -absolutes[idx]);
  });
  return answer;
}
