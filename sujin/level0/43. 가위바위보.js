function solution(rsp) {
  const winner = { 2: "0", 0: "5", 5: "2" };
  let answer = "";
  for (let i of rsp) {
    answer += winner[i];
  }
  return answer;
}
