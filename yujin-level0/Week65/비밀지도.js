function solution(n, arr1, arr2) {
  const result = [];

  for (let i = 0; i < n; i++) {
    // 비트 OR 연산 후 2진수 변환 및 자리수 맞추기
    let binaryStr = (arr1[i] | arr2[i]).toString(2).padStart(n, "0");

    let row = "";
    for (let char of binaryStr) {
      row += char === "1" ? "#" : " ";
    }

    result.push(row);
  }

  return result;
}

// 다른 풀이
// function solution(n, arr1, arr2) {
//   return arr1.map((val, i) => {
//     // 두 지도의 숫자를 비트 OR 연산 후 2진수 문자열로 변환
//     // n자리 길이에 맞추어 앞쪽을 '0'으로 채움 (padStart)
//     // 1은 '#'으로, 0은 ' '으로 치환
//     return (val | arr2[i])
//       .toString(2)
//       .padStart(n, "0")
//       .replace(/1/g, "#")
//       .replace(/0/g, " ");
//   });
// }
