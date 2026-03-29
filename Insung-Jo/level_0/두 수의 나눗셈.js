function solution(num1, num2) {
    if(typeof num1 !== 'number' || typeof num2 !== 'number') throw new Error ('입력한 값이 숫자가 아닙니다.');
    return Math.floor((num1 / num2) * 1000);
}