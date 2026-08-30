function solution(number) {
  let count = 0;

  function dfs(idx, sum, selected) {
    if (selected === 3) {
      if (sum === 0) count++;
      return;
    }

    for (let i = idx; i < number.length; i++) {
      dfs(i + 1, sum + number[i], selected + 1);
    }
  }

  dfs(0, 0, 0);
  return count;
}
