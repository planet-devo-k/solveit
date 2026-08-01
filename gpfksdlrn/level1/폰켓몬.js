// https://school.programmers.co.kr/learn/courses/30/lessons/1845

function solution(nums) {
  return Math.min(
    nums.length / 2, // 가져갈 수 있는 마리 수
    new Set(nums).size, // 폰켓몬 종류 수
  );
}
