function solution(my_string) {
  const vowels = ["a", "e", "i", "o", "u"];
  let result = "";

  for (let ch of my_string) {
    if (!vowels.includes(ch)) {
      result += ch;
    }
  }

  return result;
}
