function solution(kebabCount, drinkCount) {
  const KEBAB_PRICE = 12000;
  const DRINK_PRICE = 2000;
  const freeDrinkCount = Math.trunc(kebabCount / 10);
  const paidDrinkCount = drinkCount - freeDrinkCount;

  const totalPrice = KEBAB_PRICE * kebabCount + DRINK_PRICE * paidDrinkCount;
  return totalPrice;
}
