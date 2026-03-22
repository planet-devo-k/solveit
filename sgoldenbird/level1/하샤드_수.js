function solution(x) {
  const sum = [...String(x)].reduce((acc, cur) => acc + Number(cur), 0);
  return x % sum === 0;
}
