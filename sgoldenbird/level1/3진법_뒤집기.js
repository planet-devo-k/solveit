function solution(n) {
  const ternary = n.toString(3);
  const reversed = [...ternary].reverse().join("");

  return parseInt(reversed, 3);
}
