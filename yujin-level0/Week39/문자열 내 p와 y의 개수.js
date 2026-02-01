function solution(s) {
  let count = 0;
  for (const char of s.toUpperCase()) {
    if (char === 'P') count++;
    else if (char === 'Y') count--;
  }
  return count === 0;
}

// 다른 풀이
function solution(s){
    return s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length;
}