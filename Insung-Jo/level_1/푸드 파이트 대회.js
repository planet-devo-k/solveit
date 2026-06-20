function solution(food) {
  let answer = "0";

  for (let i = food.length - 1; i > 0; i--) {
    const count = Math.floor(food[i] / 2);
    const countFood = String(i).repeat(count);

    answer = countFood + answer + countFood;
  }

  return answer;
}
