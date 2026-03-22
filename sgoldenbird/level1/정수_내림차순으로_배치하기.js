function solution(n) {
  const sorted = String(n)
    .split("")
    .sort((a, b) => b - a)
    .join("");

  return Number(sorted);
}
