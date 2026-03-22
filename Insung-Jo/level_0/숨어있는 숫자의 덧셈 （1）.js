function solution(my_string) {
  const regex = /[a-zA-z]+/g;
  const array = my_string.replace(regex, "").split("").map(Number);
  let sum = 0;

  for (const num of array) {
    sum += num;
  }

  return sum;
}
