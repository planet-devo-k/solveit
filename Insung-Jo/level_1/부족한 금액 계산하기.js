function solution(price, money, count) {
  const answer = money;
  let amount = 0;

  for (let i = 1; i <= count; i++) {
    amount += price * i;
  }

  return amount < money ? 0 : amount - money;
}
