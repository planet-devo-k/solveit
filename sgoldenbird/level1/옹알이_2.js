function solution(babbling) {
  const validWords = ["aya", "ye", "woo", "ma"];

  return babbling.filter((word) => {
    if (validWords.some((v) => word.includes(v + v))) return false;
    let temp = validWords.reduce((acc, v) => acc.replaceAll(v, " "), word);
    return temp.trim() === "";
  }).length;
}
