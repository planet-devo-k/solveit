function solution(park, routes) {
  // 각 세로 가로 시작점 찾기
  let r = park.findIndex((row) => row.includes("S"));
  let c = park[r].indexOf("S");

  for (let route of routes) {
    let [dir, n] = route.split(" ");
    n = Number(n);

    let tr = r; // 임시 세로 위치
    let tc = c; // 임시 가로 위치
    let blocked = false;

    for (let i = 0; i < n; i++) {
      if (dir === "E") tc++;
      if (dir === "W") tc--;
      if (dir === "S") tr++;
      if (dir === "N") tr--;

      // 공원 밖이거나 'X'면 바로 중단
      if (!park[tr] || !park[tr][tc] || park[tr][tc] === "X") {
        blocked = true;
        break;
      }
    }

    // 막히지 않았을 때만 실제 위치 이동
    if (!blocked) {
      r = tr;
      c = tc;
    }
  }

  return [r, c];
}
