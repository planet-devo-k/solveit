function solution(money) {
  const price = 5500;
  const cups = Math.floor(money / price);
  const change = money % price;
  return [cups, change];
}
