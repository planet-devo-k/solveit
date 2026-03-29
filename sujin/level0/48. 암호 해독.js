function solution(cipher, code) {
  const strToArr = cipher.split("");
  return strToArr.filter((letter, idx) => (idx + 1) % code === 0).join("");
}
