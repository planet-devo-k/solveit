function solution(numbers) {
    var answer = [];
    answer = numbers.map(x=>x*2);
    return answer;
}

// 다른 풀이
// function solution(numbers) {
//     return numbers.reduce((a, b) => [...a, b * 2], []);
// }