function solution(price, money, count) {
  let sum_price = 0;
  for (let i = 1; i <= count; i++) {
    sum_price += i * price;
  }

  return sum_price > money ? sum_price - money : 0;
}
