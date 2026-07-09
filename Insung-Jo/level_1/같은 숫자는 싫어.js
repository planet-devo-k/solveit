function solution(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];

    if (answer.length === 0 || answer[answer.length - 1] !== temp) {
      answer.push(temp);
    }
  }

  return answer;
}
