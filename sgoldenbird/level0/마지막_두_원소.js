function solution(num_list) {
  const lastEl = num_list[num_list.length - 1];
  const secEl = num_list[num_list.length - 2];

  return lastEl > secEl
    ? [...num_list, lastEl - secEl]
    : [...num_list, lastEl * 2];
}
