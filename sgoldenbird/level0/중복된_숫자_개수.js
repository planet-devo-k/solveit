function solution(array, n) {
  let count = 0;

  for (let el of array) {
    if (el === n) count++;
  }

  return count;
}

// filter/reduce로 푸는 것도 가능
