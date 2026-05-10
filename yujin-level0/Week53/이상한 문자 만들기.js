function solution(s) {
  let result = "";
  let index = 0; // 단어 안에서의 순서를 셀 별도의 변수

  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      result += " ";
      index = 0; // 공백을 만나면 다시 0부터 시작
    } else {
      result += index % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase();
      index++; // 글자일 때만 인덱스를 증가시킴
    }
  }
  return result;
}

// 다른 풀이
// function solution(s) {
//     return s.split(" ").map(word => {
//         return [...word].map((char, index) =>
//             index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
//         ).join("");
//     }).join(" ");
// }
