// https://school.programmers.co.kr/learn/courses/30/lessons/181844

// 반복 탐색(includes)을 Set 기반 O(1) 조회로 개선
// Set: 값의 존재 여부를 빠르게 확인하기 위한 해시 기반 자료구조
function solution(arr, delete_list) {
  const setDelete_list = new Set(delete_list);
  return arr.filter((num) => !setDelete_list.has(num));
}