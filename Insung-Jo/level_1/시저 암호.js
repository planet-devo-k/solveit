function solution(s, n) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let answer = "";

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === " ") {
      answer += " ";
      continue;
    }

    const index = alphabet.indexOf(char.toLowerCase());

    const nextChar = alphabet[(index + n) % 26];

    answer += char === char.toUpperCase() ? nextChar.toUpperCase() : nextChar;
  }

  return answer;
}
