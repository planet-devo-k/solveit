function solution(n) {
    const answer = String(n).split("").sort((a,b) => b - a).join("");
    return +answer;
}