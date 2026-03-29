function solution(num_list) {
  var answer = num_list;
  const even = answer.filter((num) => num % 2 === 0).length;
  const odd = answer.filter((num) => num % 2 === 1).length;

  const result = [even, odd];

  return result;
}
