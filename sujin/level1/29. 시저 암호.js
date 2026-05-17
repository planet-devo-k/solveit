function solution(s, n) {
  let answer = "";

  for (let char of s) {
    if (char === " ") {
      answer += " ";
      continue;
    }

    const ascii = char.charCodeAt(0);

    if (ascii >= 65 && ascii <= 90) {
      let moved = ascii + n;

      if (moved > 90) {
        moved -= 26;
      }

      answer += String.fromCharCode(moved);
    } else if (ascii >= 97 && ascii <= 122) {
      let moved = ascii + n;

      if (moved > 122) {
        moved -= 26;
      }

      answer += String.fromCharCode(moved);
    }
  }

  return answer;
}
