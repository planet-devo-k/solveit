// https://school.programmers.co.kr/learn/courses/30/lessons/135808

// 1. 점수가 높은 사과부터 내림차순 정렬한다.
// 2. 앞에서부터 m개씩 한 상자로 묶는다.
// 3. 각 상자의 마지막 사과(가장 낮은 점수)를 기준으로
//    (최소 점수 × m)을 계산해 더한다.
// 4. m개를 채우지 못하는 남은 사과는 버린다.

function solution(k, m, score) {
    // 점수가 높은 사과부터 정렬
    const sortedScore = score.sort((a, b) => b - a);
    let answer = 0;
    
    // m개씩 묶었을 때 마지막 사과(최소 점수)로 상자 가격 계산
    for (let i = m - 1; i < sortedScore.length; i += m) {
        answer += sortedScore[i] * m;
    }
    
    return answer;
}