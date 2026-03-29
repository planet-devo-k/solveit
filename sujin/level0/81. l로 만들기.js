function solution(myString) {
  const forarr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
  return [...myString].map((item) => (forarr.includes(item) ? (item = "l") : item)).join("");
}
