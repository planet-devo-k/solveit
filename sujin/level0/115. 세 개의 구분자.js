function solution(myStr) {
  const result = myStr.split(/[abc]/).filter((s) => s.length > 0);
  return result.length === 0 ? ["EMPTY"] : result;
}
