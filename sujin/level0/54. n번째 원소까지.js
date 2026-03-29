function solution(num_list, n) {
  const answer = [];
  let i = 0;
  while (answer.length < n) {
    answer.push(num_list[i]);
    i++;
  }
  return answer;
}
