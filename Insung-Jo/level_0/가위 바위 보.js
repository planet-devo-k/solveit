function solution(rsp) {
  let array = rsp.split("");
  let answer = [];

  for (const num of array) {
    if (num === "2") answer.push("0");
    if (num === "0") answer.push("5");
    if (num === "5") answer.push("2");
  }

  return answer.join("");
}
