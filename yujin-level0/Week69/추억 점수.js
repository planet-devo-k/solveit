function solution(name, yearning, photo) {
  const scoreMap = {};

  name.forEach((n, index) => {
    scoreMap[n] = yearning[index];
  });

  return photo.map((people) =>
    // scoreMap[person] || 0 처리 이유: 그리움 점수가 없는 인물을 만났을 때 NaN 반환
    people.reduce((sum, person) => sum + (scoreMap[person] || 0), 0),
  );
}

// 다른 풀이
function solution(name, yearning, photo) {
  return photo.map((v) =>
    v.reduce((a, c) => (a += yearning[name.indexOf(c)] ?? 0), 0),
  );
}
