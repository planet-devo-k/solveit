function solution(myString, pat) {
  let switchedString = "";
  for (let char of myString) {
    switchedString += char === "A" ? "B" : "A";
  }

  return switchedString.includes(pat) ? 1 : 0;
}
