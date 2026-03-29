function solution(my_string) {
  let answer = "";
  let alpa = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < my_string.length; i++) {
    if (!alpa.includes(my_string[i])) {
      answer += my_string[i];
    }
  }
  return answer;
}

// 참고용
// function solution(my_string) {
//     return Array.from(my_string).filter(t => !['a', 'e', 'i', 'o', 'u'].includes(t)).join('');
// }
