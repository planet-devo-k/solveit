function solution(s) {
  const lowerS = s.toLowerCase();
  let countP = 0;
  let countY = 0;

  for (const char of lowerS) {
    if (char === "p") {
      countP++;
    }
    if (char === "y") {
      countY++;
    }
  }

  return countP === countY ? true : false;
}
