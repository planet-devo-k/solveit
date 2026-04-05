function solution(num_list, n) {
    var answer = [];
    for(let num = 0; num < num_list.length; num++){
        if(num % n === 0) answer.push(num_list[num]);
    }
    return answer;
}