function solution(arr1, arr2) {
  // 각 행(row)을 순회
  // 행 안의 각 숫자(num)에 arr2의 같은 위치 값을 더함
  return arr1.map((row, i) => row.map((num, j) => num + arr2[i][j]));
}
