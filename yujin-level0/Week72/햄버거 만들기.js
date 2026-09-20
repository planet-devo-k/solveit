function solution(ingredient) {
  const stack = [];
  let count = 0;

  for (const item of ingredient) {
    stack.push(item);

    // 스택에 재료가 4개 이상 쌓였을 때 끝의 4자리를 확인
    const len = stack.length;
    if (
      len >= 4 &&
      stack[len - 4] === 1 &&
      stack[len - 3] === 2 &&
      stack[len - 2] === 3 &&
      stack[len - 1] === 1
    ) {
      // 햄버거 완성 -> 재료 4개 제거
      stack.pop();
      stack.pop();
      stack.pop();
      stack.pop();
      count++;
    }
  }

  return count;
}
