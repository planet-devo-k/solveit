// https://school.programmers.co.kr/learn/courses/30/lessons/159994

function solution(cards1, cards2, goal) {
  let i = 0;
  let j = 0;

  for (const word of goal) {
    if (word === cards1[i]) {
      i++;
    } else if (word === cards2[j]) {
      j++;
    } else {
      return 'No';
    }
  }

  return 'Yes';
}
