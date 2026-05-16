function solution(arr1, arr2) {
  let len1 = arr1.length;
  let len2 = arr2.length;

  // 1. 길이가 다르면 긴 쪽이 승리
  if (len1 !== len2) {
    return len1 > len2 ? 1 : -1;
  }

  // 2. 길이가 같으면 원소의 합을 비교
  let sum1 = arr1.reduce((acc, cur) => acc + cur, 0);
  let sum2 = arr2.reduce((acc, cur) => acc + cur, 0);

  if (sum1 !== sum2) {
    return sum1 > sum2 ? 1 : -1;
  }

  // 3. 길이도 같고 합도 같으면 0
  return 0;
}
