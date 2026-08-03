// https://school.programmers.co.kr/learn/courses/30/lessons/120890

function solution(array, n) {
  return array.reduce((closest, num) => {
    const currentDiff = Math.abs(num - n);
    const closestDiff = Math.abs(closest - n);

    if (currentDiff < closestDiff) return num;
    // 가장 가까운 수가 여러 개일 경우 더 작은 수를 return
    if (currentDiff === closestDiff && num < closest) return num;
    return closest;
  });
}