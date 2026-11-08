// https://school.programmers.co.kr/learn/courses/30/lessons/389478

function solution(n, w, num) {
  const floor = Math.floor((num - 1) / w);
  const col = floor % 2 === 0 ? (num - 1) % w : w - 1 - ((num - 1) % w);

  let count = 1;

  // 위층에서 같은 열에 있는 상자 찾기
  for (let i = num + 1; i <= n; i++) {
    const currentFloor = Math.floor((i - 1) / w);
    const currentCol =
      currentFloor % 2 === 0 ? (i - 1) % w : w - 1 - ((i - 1) % w);

    if (currentCol === col && currentFloor > floor) {
      count++;
    }
  }

  return count;
}
