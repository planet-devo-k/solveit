function solution(n_str) {
  let answer = "";

  for (let i = 0; i < n_str.length; i++) {
    if (+n_str[i] !== 0) return (answer = n_str.slice(i));
  }
}
