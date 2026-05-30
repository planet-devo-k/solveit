function solution(binomial) {
  const [a, op, b] = binomial.split(" ");
  const num1 = +a;
  const num2 = +b;

  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    default:
      return;
  }
}
