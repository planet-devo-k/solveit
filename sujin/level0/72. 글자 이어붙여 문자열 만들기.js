function solution(my_string, index_list) {
  return index_list.map((item, idx) => my_string[item]).join("");
}
