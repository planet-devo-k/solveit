function solution(number, n, m) {
    return number % n === 0 && number % m === 0 ? 1 : 0
}

// 다른 풀이 
// function solution(number, n, m) {
//   return +!(number % n || number % m);
// }