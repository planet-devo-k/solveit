function solution(food) {
  let left = "";

  for (let i = 1; i < food.length; i++) {
    for (let j = 0; j < Math.floor(food[i] / 2); j++) {
      left += i;
    }
  }

  let right = left.split("").reverse().join("");

  return left + "0" + right;
}
