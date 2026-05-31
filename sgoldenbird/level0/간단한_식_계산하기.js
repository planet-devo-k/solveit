function solution(binomial) {
  const [a, op, b] = binomial.split(" ");

  if (op === "+") return Number(a) + Number(b);
  if (op === "-") return Number(a) - Number(b);

  return Number(a) * Number(b);
}
