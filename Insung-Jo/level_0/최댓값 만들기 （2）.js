function solution(numbers) {
    const answer = numbers.sort((a,b) => a - b);
    const array = [];
    let count = 0;
    
    while(count <= numbers.length){
        array.push(answer[count] * answer[count+1])
        count++
    }
    
    const clean = array.filter((value) => !Number.isNaN(value));
    
    return Math.max(...clean);
}