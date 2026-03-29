function solution(num_list) {
  const answer = ["", ""];
  for (let num of num_list) {
    num % 2 === 0 ? (answer[1] += String(num)) : (answer[0] += String(num));
  }
  return Number(answer[0]) + Number(answer[1]);
}
