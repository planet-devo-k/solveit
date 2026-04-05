function solution(num_list) {
    let even = [];
    let odd = [];
    for(let num of num_list){
        if(num % 2 === 0){
            even.push(num);
        } else odd.push(num);
    }
    
    const answer = Number(even.join("")) + Number(odd.join(""));
    

    return answer;
}