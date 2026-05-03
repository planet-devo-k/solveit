function solution(arr, n) {
  const isOdd = arr.length % 2 === 1;

  if (isOdd) {
    for (let i = 0; i < arr.length; i += 2) {
      arr[i] += n;
    }
  } else {
    for (let i = 1; i < arr.length; i += 2) {
      arr[i] += n;
    }
  }

  return arr;
}