function solution(str_list, ex) {
  let answer = "";
  str_list.forEach((list) => {
    if (list.includes(ex)) {
      answer += "";
    } else {
      answer += list;
    }
  });
  return answer;
}
