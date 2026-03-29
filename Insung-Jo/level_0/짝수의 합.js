function solution(n) {
  if(typeof n !== 'number') throw new Error('정수를 입력해주세요.');
  if(n <= 1) return 0;

  let result = 0;

  for(let i = 2; i <= n; i+=2){
    result += i;
  }

  return result;
}