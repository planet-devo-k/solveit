// https://school.programmers.co.kr/learn/courses/30/lessons/120891function solution(order) {
 
function solution(order) {
    return [...String(order)].filter(char => "369".includes(char)).length;
}