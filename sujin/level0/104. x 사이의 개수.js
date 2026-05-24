function solution(myString) {
  const splitedStr = myString.split("x");
  return splitedStr.map((item) => item.length);
}
