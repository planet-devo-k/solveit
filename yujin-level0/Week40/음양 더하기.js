function solution(absolutes, signs) {
    let result = 0;
    for(let i = 0; i < signs.length; i++) {
        signs[i] ? result += absolutes[i] : result -= absolutes[i]
    }
    return result;
}

// 다른 풀이
function solution(absolutes, signs) {
    return absolutes.reduce((acc, val, i) => acc + (val * (signs[i] ? 1 : -1)), 0);
}