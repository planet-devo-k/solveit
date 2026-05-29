function solution(binomial) {
  let [a, op, b] = binomial.split(" ");
  let result = 0;

  const num1 = Number(a);
  const num2 = Number(b);

  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
  }

  return result;
}
