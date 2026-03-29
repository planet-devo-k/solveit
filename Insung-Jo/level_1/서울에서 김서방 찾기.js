function solution(seoul) {
  let x = 0;

  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") x = i;
  }

  return `김서방은 ${x}에 있다`;
}
