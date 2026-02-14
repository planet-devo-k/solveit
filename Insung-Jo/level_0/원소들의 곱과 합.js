function solution(num_list) {
  let plus = 1;
  let square = 0;

  for (let number of num_list) {
    plus = plus * number;
    square += number;
  }

  return plus > square * square ? 0 : 1;
}
