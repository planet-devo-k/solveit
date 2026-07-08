function solution(myStr) {
  const result = [];
  let temp = "";

  for (let i = 0; i < myStr.length; i++) {
    const char = myStr[i];

    if (char === "a" || char === "b" || char === "c") {
      if (temp !== "") {
        result.push(temp);
        temp = "";
      }
    } else {
      temp += char;
    }
  }

  if (temp !== "") {
    result.push(temp);
  }

  return result.length === 0 ? ["EMPTY"] : result;
}
