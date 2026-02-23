function solution(num_list) {
  const plus = num_list.reduce((acc, cur) => acc + cur, 0) ** 2;
  const multiple = num_list.reduce((acc, cur) => acc * cur);
  return multiple < plus ? 1 : 0;
}
