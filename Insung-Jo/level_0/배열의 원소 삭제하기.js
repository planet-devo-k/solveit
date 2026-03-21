function solution(arr, delete_list) {
  const answer = [...arr];
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < delete_list.length; j++) {
      if (answer[i] === delete_list[j]) {
        answer.splice(i, 1);
        i--;
      }
    }
  }
  return answer;
}
