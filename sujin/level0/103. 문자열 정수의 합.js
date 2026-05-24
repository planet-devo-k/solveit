function solution(num_str) {
    let answer = 0
    for(let i of num_str){
        answer += +i
    }
    return answer
}