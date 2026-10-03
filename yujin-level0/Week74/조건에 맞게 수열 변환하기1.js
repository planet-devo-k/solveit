function solution(arr) {
  return arr.map((num) => {
    if (num >= 50 && num % 2 === 0) {
      return num / 2;
    }
    if (num < 50 && num % 2 !== 0) {
      return num * 2;
    }
    return num; // 둘 다 해당하지 않는 수는 그대로 유지
  });
}
