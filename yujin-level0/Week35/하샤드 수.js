function solution(x) {
  const num = String(x).split("");
  let num2 = 0;

  for (let i = 0; i < num.length; i++) {
    num2 += parseInt(num[i]);
  }
  if (x % num2 === 0) {
    return true;
  } else {
    return false;
  }
}

// 다른 풀이
// function solution(x) {
//     return x%eval([...x.toString()].join("+")) ? false : true;
// }
