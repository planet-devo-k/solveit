function solution(my_string, is_suffix) {
  return Number(my_string.slice(-is_suffix.length) === is_suffix);
}
