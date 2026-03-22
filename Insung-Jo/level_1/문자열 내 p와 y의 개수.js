function solution(s) {
  const answer = s.toUpperCase().split("");
  let pCount = 0;
  let yCount = 0;

  for (const i of answer) {
    if (i === "p" || i === "P") pCount++;
    if (i === "y" || i === "Y") yCount++;
  }

  return pCount === yCount ? true : false;
}
