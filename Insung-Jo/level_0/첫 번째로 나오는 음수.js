function solution(num_list) {
  for (let num = 0; num < num_list.length; num++) {
    if (num_list[num] < 0) return num;
  }

  return -1;
}
