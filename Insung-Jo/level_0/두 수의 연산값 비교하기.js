function solution(a, b) {
  const first_operation = Number(`${a}${b}`);
  const second_operation = 2 * a * b;

  if (first_operation > second_operation) return first_operation;
  if (first_operation === second_operation) return first_operation;
  return second_operation;
}
