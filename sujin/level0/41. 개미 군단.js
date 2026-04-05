function solution(hp) {
  let answer = 0;
  answer = Math.floor(hp / 5);
  hp = hp % 5;
  answer += Math.floor(hp / 3);
  hp = hp % 3;
  answer += Math.floor(hp);
  return answer;
}
