function solution(my_string) {
    let reversed = '';
    for (const char of my_string) {
        reversed = char + reversed;
    }
    return reversed;
}