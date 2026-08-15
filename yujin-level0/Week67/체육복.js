function solution(n, lost, reserve) {
  // 모든 학생의 기본 체육복 수를 1로 초기화 (인덱스 편의를 위해 n+1 크기)
  const clothes = Array(n + 1).fill(1);

  // 도난당한 학생 -1
  lost.forEach((i) => clothes[i]--);
  // 여벌 있는 학생 +1
  reserve.forEach((i) => clothes[i]++);

  // 빌려주기
  for (let i = 1; i <= n; i++) {
    if (clothes[i] === 0) {
      if (clothes[i - 1] === 2) {
        clothes[i - 1]--;
        clothes[i]++;
      } else if (clothes[i + 1] === 2) {
        clothes[i + 1]--;
        clothes[i]++;
      }
    }
  }

  return clothes.slice(1).filter((count) => count >= 1).length;
}

// 다른 풀이
function solution(n, lost, reserve) {
  return (
    n -
    lost.filter((a) => {
      // 1. 도난당한 학생(a)과 번호 차이가 1 이하인 여벌 학생(b)을 찾음
      const b = reserve.find((r) => Math.abs(r - a) <= 1);

      // 2. 빌려줄 수 있는 학생이 없으면(!b) lost에 남김(true)
      if (!b) return true;

      // 3. 빌려줬다면 reserve 배열에서 해당 학생(b)을 제거
      reserve = reserve.filter((r) => r !== b);

      // (주의: 반환값이 없으므로 암묵적으로 undefined(falsy)를 반환 -> lost에서 제거됨)
    }).length
  );
}
