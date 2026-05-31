function solution(n) {
  const ternary = n.toString(3);
  const reversedTernary = ternary.split("").reverse().join("");
  return parseInt(reversedTernary, 3);
}
