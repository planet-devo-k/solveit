function solution(cipher, code) {
    let array = cipher.split("");
    let answer = []
    
    for(let i = 0; i <= array.length; i++){
        if(i % code === 0 && i != 0) {
            answer.push(array[i - 1]);
        }
    }
    return answer.join("");
}