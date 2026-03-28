function solution(str_list, ex) {
  const result = [];

  for (let str of str_list) {
    if (!str.includes(ex)) {
      result.push(str);
    }
  }

  return result.join("");
}
