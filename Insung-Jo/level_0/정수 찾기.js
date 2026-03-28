function solution(num_list, n) {
  for (let num of num_list) {
    if (num === n) return 1;
  }

  return 0;
}
