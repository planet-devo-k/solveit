function solution(s) {
  const answer = [];
  const positionMap = {};

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (positionMap[char] === undefined) {
      answer.push(-1);
    } else {
      answer.push(i - positionMap[char]);
    }
    positionMap[char] = i;
  }

  return answer;
}
