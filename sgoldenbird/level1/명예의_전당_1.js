function solution(k, score) {
    var answer = [];
    var hallOfFame = [];
    
    for (let i = 0; i < score.length; i++) {
        hallOfFame.push(score[i]);
        hallOfFame.sort((a, b) => b - a);
        if (hallOfFame.length > k) {
            hallOfFame.pop();
        }
        
        answer.push(hallOfFame[hallOfFame.length - 1]);
    }
    
    return answer;
}