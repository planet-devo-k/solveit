function solution(str_list, ex) {
  let answer = "";
  str_list.forEach((list) => {
    answer += list.includes(ex) ? "" : list;
  });
  return answer;
}

// 다른 풀이
function solution(str_list, ex) {
  // filter는 true를 거르는게 아닌 true를 포함시킴
  return str_list.filter((str) => !str.includes(ex)).join("");
}
