function solution(binomial) {
  let arr = binomial.split(" ");
  let result = 0;
  if (arr[1] === "+") {
    result = arr[0] + arr[2];
  } else if (arr[1] === "-") {
    result = arr[0] - arr[2];
  } else {
    result = arr[0] * arr[2];
  }

  return result;
}
