function solution(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return;
    if (num2 === 0) return null;
    const result = num1 % num2;

    return result;
}