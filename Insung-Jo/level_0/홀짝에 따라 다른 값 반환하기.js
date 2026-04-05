function solution(n) {
  let even = 0;
  let odd = 0;

  for (let num = 1; num <= n; num++) {
    if (num % 2 === 0) even += num * num;
    else odd += num;
  }

  return n % 2 === 0 ? even : odd;
}
