function solution(my_string, letter) {
    var answer = '';
    for (const char of my_string){
        if(char !== letter){
            answer += char; 
        }
    }
    
    return answer;
}