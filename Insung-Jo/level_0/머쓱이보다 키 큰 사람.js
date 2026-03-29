function solution(array, height) {
  const answer = array;
  let result = 0;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] > height) {
      result++;
    }
  }
  return result;
}
