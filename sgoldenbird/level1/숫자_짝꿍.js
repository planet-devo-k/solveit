function solution(X, Y) {
  let answer = "";
  const countX = new Array(10).fill(0);
  const countY = new Array(10).fill(0);

  for (const ch of X) countX[ch]++;
  for (const ch of Y) countY[ch]++;

  for (let d = 9; d >= 0; d--) {
    const common = Math.min(countX[d], countY[d]);
    answer += String(d).repeat(common);
  }

  if (answer === "") return "-1";
  if (answer[0] === "0") return "0";
  return answer;
}
