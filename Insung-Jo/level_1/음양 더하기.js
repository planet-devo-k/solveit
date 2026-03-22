function solution(absolutes, signs) {
  const array = [...absolutes];
  let sum = 0;

  for (let i = 0; i < absolutes.length; i++) {
    if (Number(signs[i]) === 0) {
      array[i] = array[i] * -1;
    }
    sum += array[i];
  }
  return sum;
}
