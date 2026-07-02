function solution(num_list) {
  let count = 0;

  for (let num of num_list) {
    let current = num;
    while (current > 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = (current - 1) / 2;
      }
      count++;
    }
  }
  return count;
}
