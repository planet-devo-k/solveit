function solution(s) {
  const lowerCase = s.toLowerCase();
  const compare = { p: 0, y: 0 };
  for (let i of lowerCase) {
    if (i === "p") {
      compare.p += 1;
    } else if (i === "y") {
      compare.y += 1;
    }
  }
  return compare.p === compare.y;
}
