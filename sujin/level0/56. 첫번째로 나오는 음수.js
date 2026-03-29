function solution(num_list) {
  for (let i of num_list) {
    if (Math.sign(i) === -1) {
      return num_list.indexOf(i);
    }
  }
  return -1;
}
