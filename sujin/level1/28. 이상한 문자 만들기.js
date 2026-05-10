function solution(s) {
  const splited_str = s.split(" ");

  for (let i = 0; i < splited_str.length; i++) {
    let word = "";
    for (let j = 0; j < splited_str[i].length; j++) {
      word += j % 2 === 0 ? splited_str[i][j].toUpperCase() : splited_str[i][j].toLowerCase();
    }
    splited_str[i] = word;
  }
  return splited_str.join(" ");
}
