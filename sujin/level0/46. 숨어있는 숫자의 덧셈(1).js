function solution(my_string) {
  let answer = 0;
  for (let i of my_string) {
    if (!isNaN(i)) {
      answer += Number(i);
    }
  }
  return answer;
}
