function solution(s) {
  let count = 0;
  for (const char of s.toUpperCase()) {
    if (char === 'P') count++;
    else if (char === 'Y') count--;
  }
  return count === 0;
}

// 다른 풀이
function solution(s) {
    const upperS = s.toUpperCase();
    // 각각의 개수를 변수에 담아 비교하면 가독성이 훨씬 좋아짐!
    const pCount = upperS.split("P").length - 1;
    const yCount = upperS.split("Y").length - 1;
    // 만일 p가 2개면 
    
    return pCount === yCount;
}