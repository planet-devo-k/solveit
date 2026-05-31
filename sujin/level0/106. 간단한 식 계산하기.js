function solution(binomial) {
  const splited_bino = binomial.split(" ");
  switch (splited_bino[1]) {
    case "+":
      return Number(splited_bino[0]) + Number(splited_bino[2]);
    case "-":
      return Number(splited_bino[0]) - Number(splited_bino[2]);
    case "*":
      return Number(splited_bino[0]) * Number(splited_bino[2]);
  }
}
