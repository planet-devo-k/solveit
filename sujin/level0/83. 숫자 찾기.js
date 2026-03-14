function solution(num, k) {
  return String(num).includes(String(k)) ? String(num).indexOf(String(k)) + 1 : -1;
}
