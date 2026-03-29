function solution(money) {
  const answer = [0, 0];
  let coffee = 0;
  let total = 0;

  while (money > 0) {
    if (money >= 5500) {
      money -= 5500;
      answer[0] += 1;
    } else {
      answer[1] += money;
      break;
    }
  }

  return answer;
}
