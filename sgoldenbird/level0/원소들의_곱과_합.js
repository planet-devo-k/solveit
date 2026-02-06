function solution(num_list) {
  let sum = 0;
  let mul = 1;
  for (const num of num_list) {
    sum += num;
    mul *= num;
  }
  return mul < sum ** 2 ? 1 : 0;
}
