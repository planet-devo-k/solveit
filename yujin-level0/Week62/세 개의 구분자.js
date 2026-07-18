function solution(myStr) {
  // 모든 구분자를 'a' 하나로 합침
  let UnifiedStr = myStr.replaceAll("b", "a").replaceAll("c", "a");
  let answer = UnifiedStr.split("a").filter((str) => str !== "");

  return answer.length === 0 ? ["EMPTY"] : answer;
}

// 다른 풀이
// const solution=s=>s.match(/[^a-c]+/g)||['EMPTY']
