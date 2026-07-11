function solution(myStr) {
  const splitArray = myStr.split(/[abc]/);
  const answer = splitArray.filter((str) => str !== "");

  return answer.length === 0 ? ["EMPTY"] : answer;
}
