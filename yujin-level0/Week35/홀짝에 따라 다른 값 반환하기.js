function solution(n) {
  let sum = 0;
  if (n % 2 === 0) {
    for (let i = 2; i <= n; i += 2) {
      sum += i * i;
    }
  } else {
    for (let i = 1; i <= n; i += 2) {
      sum += i;
    }
  }
  return sum;
}

// 다른 풀이
// function solution(n) {
//     if(n%2===1)
//       return  (n+1)/2*((n + 1)/2) ;
//     else
//       return   n*(n+1)*(n+2)/6;
// }
