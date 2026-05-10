function solution(order) {
  return ("" + order)
    .split("")
    .filter((number) => number === "3" || number === "6" || number === "9")
    .length;
}
