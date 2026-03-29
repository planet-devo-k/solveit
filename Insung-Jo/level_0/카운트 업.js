function solution(start_num, end_num) {
    const answer = [];
    let count = start_num;
    while(count <= end_num){
        answer.push(count)
        count++;
    }
    return answer;
}