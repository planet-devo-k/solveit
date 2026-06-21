function solution(names) {
    const answer = []
    let i = 0
    while(i < names.length){
        answer.push(names[i])
        i+=5
    }
    return answer
}