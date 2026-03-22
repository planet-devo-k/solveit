function solution(my_string, index_list) {
  let answer = [];

  for (let i = 0; i < index_list.length; i++) {
    let number = index_list[i];

    answer += my_string[number];
  }

  return answer;
}
