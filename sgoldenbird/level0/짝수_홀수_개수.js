function solution(num_list) {
  let answer = [];
  let evenCount = 0;
  let oddCount = 0;

  for (let num of num_list) {
    if (num % 2 === 0) {
      evenCount += 1;
    } else {
      oddCount += 1;
    }
  }

  answer = [evenCount, oddCount];
  return answer;
}
