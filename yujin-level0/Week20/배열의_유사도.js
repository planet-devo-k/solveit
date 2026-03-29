function solution(s1, s2) {
  let count = 0;
  for (i = 0; i < s1.length; i++)
    if (s2.includes(s1[i])) {
      count++;
    }
  return count;
}

// 참고용
// function solution(s1, s2) {
//     const answer = s1.filter((x) => s2.includes(x));  // s1의원소(x)를 하나씩 필터할건데, s2가 해당 원소를 가지는 것만 빼서 배열로 만든다.
//     return answer.length;
// }
