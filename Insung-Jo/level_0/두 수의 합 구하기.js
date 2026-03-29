function solution(num1, num2) {
    if(typeof num1 !== 'number' || typeof num2 !== 'number') throw new Error('입력 값이 숫자가 아닙니다.');
    return num1 + num2;
}