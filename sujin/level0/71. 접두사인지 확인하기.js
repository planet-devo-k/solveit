function solution(my_string, is_prefix) {
  const prefix = [];
  let element = "";
  for (let i of my_string) {
    element += i;
    prefix.push(element);
  }
  return prefix.includes(is_prefix) ? 1 : 0;
}
