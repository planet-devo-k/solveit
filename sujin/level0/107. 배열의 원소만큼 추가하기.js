function solution(arr) {
  const X = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i]; j++) {
      X.push(arr[i]);
    }
  }
  return X;
}
