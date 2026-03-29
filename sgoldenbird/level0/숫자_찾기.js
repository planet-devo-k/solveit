function solution(num, k) {
  const stringNum = String(num);
  const stringK = String(k);

  return stringNum.indexOf(stringK) + 1 || -1;
}
