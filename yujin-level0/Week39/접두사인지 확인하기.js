function solution(my_string, is_prefix) {
  // boolean 앞에 + 해주면 true는 1, false는 0으로 변환
  return +my_string.startsWith(is_prefix);
}