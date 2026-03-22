function solution(a, b) {
    let sum = 0;
    let start = Math.min(a, b); // 두 정수 중 더 작은 값으로 시작
    let end = Math.max(a, b);   // 두 정수 중 더 큰 값으로 종료
    
    for (let i = start; i <= end; i++) {
        sum += i;
    }
    
    return sum;
}