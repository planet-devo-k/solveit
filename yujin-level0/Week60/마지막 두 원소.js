function solution(num_list) {
  let len = num_list.length;
  let last = num_list[len - 1];
  let before = num_list[len - 2];
  last - before > 0 ? num_list.push(last - before) : num_list.push(last * 2);
  return num_list;
}

// 다른 풀이
// function solution(num_list) {
//   const [sec, last] = num_list.slice(-2);
//   last > sec ? num_list.push(last - sec) : num_list.push(last * 2);
//   return num_list;
// }
