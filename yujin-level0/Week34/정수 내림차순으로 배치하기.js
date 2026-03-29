function solution(n) {
  return parseInt(
    (n + "")
      .split("")
      .sort((a, b) => b - a)
      .join("")
  );
}

// 다른 풀이
function solution(n) {
  const newN = n + "";
  const newArr = newN.split("").sort().reverse().join("");

  return +newArr;
}
