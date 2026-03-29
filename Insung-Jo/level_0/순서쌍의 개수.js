function solution(n) {
    let result = 0;
    
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            result++;
            if (i !== n / i) result++; 
        }
    }
    return result;
}