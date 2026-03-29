function solution(my_string, alp) {
  return [...my_string]
    .map((word) => (word === alp ? word.toUpperCase() : word))
    .join("");
}
