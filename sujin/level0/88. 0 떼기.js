function solution(n_str) {
  for (let i of n_str) {
    if (i !== "0") {
      const idxNum = n_str.indexOf(i);
      return n_str.slice(idxNum);
    }
  }
}
