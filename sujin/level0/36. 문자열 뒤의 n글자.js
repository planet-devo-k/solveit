function solution(my_string, n) {
  const STR_LEN = my_string.length;
  return my_string.slice(STR_LEN - n, STR_LEN);
}
