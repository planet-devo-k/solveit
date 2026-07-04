function solution(t, p) {
  let answer = 0;
  const pLength = p.length;
  const pValue = BigInt(p);

  for (let i = 0; i <= t.length - pLength; i++) {
    const subStr = t.slice(i, i + pLength);

    if (BigInt(subStr) <= pValue) {
      answer++;
    }
  }

  return answer;
}
