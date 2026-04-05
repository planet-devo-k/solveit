function solution(myString) {
  return [...myString]
    .map((word) => (word > "l" ? (word = word) : "l"))
    .join("");
}
