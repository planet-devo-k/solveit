function solution(str1, str2) {
  if(typeof str1 !== 'string' || typeof str2 !== 'string') throw new Error('문자를 입력해주세요.');
  const result = str1.indexOf(str2) !== -1 ? 1 : 2;

  return result;
}