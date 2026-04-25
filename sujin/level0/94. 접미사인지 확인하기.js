function solution(my_string, is_suffix) {
  const suffix_arr = [...Array(my_string.length)].map((item, idx) => my_string.slice(-idx));
  return suffix_arr.includes(is_suffix) ? 1 : 0;
}
