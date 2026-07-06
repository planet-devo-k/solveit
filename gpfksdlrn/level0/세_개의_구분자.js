// https://school.programmers.co.kr/learn/courses/30/lessons/181862

function solution(myStr) {
  const answer = myStr
    .replaceAll('a', ' ')
    .replaceAll('b', ' ')
    .replaceAll('c', ' ')
    .split(' ')
    .filter(Boolean);
  return answer.length ? answer : ['EMPTY'];
}

// 정규표현식을 사용하면 더 간결하게 작성할 수 있다.
/*
function solution(myStr) {
  const answer = myStr.split(/[abc]/).filter(Boolean);
  return answer.length ? answer : ['EMPTY'];
}
*/