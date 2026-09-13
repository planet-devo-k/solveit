// RETRY
function solution(park, routes) {
  let r = park.findIndex((row) => row.includes("S"));
  let c = park[r].indexOf("S");

  const moves = { N: [-1, 0], S: [1, 0], W: [0, -1], E: [0, 1] };
  const H = park.length;
  const W = park[0].length;

  for (const route of routes) {
    const [op, n] = route.split(" ");
    const [dr, dc] = moves[op];
    let tempR = r;
    let tempC = c;
    let possible = true;

    for (let i = 0; i < Number(n); i++) {
      tempR += dr;
      tempC += dc;
      if (
        tempR < 0 ||
        tempR >= H ||
        tempC < 0 ||
        tempC >= W ||
        park[tempR][tempC] === "X"
      ) {
        possible = false;
        break;
      }
    }
    if (possible) {
      r = tempR;
      c = tempC;
    }
  }
  return [r, c];
}
