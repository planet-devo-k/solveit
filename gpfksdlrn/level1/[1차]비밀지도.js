// https://school.programmers.co.kr/learn/courses/30/lessons/17681

function solution(n, arr1, arr2) {
  return arr1.map((num, i) =>
    (num | arr2[i])
      .toString(2)
      .padStart(n, '0')
      .replace(/1/g, '#')
      .replace(/0/g, ' '),
  );
}
