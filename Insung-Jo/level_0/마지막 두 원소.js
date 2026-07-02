function solution(num_list) {
  const lastIdx = num_list.length - 1;
  const last = num_list[lastIdx];
  const prev = num_list[lastIdx - 1];

  const newValue = last > prev ? last - prev : last * 2;

  return [...num_list, newValue];
}
