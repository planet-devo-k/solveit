function solution(my_string, n) {
    var answer = '';
    for (const char of my_string) {
        answer += char.repeat(n);
    }
    
    return answer;
}