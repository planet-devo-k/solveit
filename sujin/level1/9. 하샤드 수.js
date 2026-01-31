function solution(x) {
  let sum = 0;
  for (let i of String(x)) {
    sum += Number(i);
  }
  return x % sum === 0 ? true : false;
}
