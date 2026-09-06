function solution(array, n) {
  return array.sort((a, b) => {
    const diffA = Math.abs(a - n);
    const diffB = Math.abs(b - n);

    if (diffA === diffB) {
      return a - b;
    }

    return diffA - diffB;
  })[0];
}
