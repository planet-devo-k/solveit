function solution(strArr) {
  let result = [];
  for (let i = 0; i < strArr.length; i++) {
    i % 2 === 0
      ? result.push(strArr[i].toLowerCase())
      : result.push(strArr[i].toUpperCase());
  }

  return result;
}

// 간단 풀이
function solution(strArr) {
  return strArr.map((v, i) =>
    i % 2 === 0 ? v.toLowerCase() : v.toUpperCase(),
  );
}
