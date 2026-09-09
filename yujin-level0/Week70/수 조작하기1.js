function solution(n, control) {
  for (let char of control) {
    switch (char) {
      case "w":
        n += 1;
        break;
      case "s":
        n -= 1;
        break;
      case "d":
        n += 10;
        break;
      case "a":
        n -= 10;
        break;
    }
  }
  return n;
}

// 다른 풀이
function solution(n, control) {
  let answer = n;
  const o = {
    w: 1,
    s: -1,
    d: 10,
    a: -10,
  };

  control.split("").forEach((e) => (answer += o[e]));
  return answer;
}
