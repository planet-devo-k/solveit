// https://school.programmers.co.kr/learn/courses/30/lessons/118666

function solution(survey, choices) {
  // 유형별 점수판
  const score = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
  survey.forEach((pair, i) => {
    const [disagree, agree] = pair;
    const choice = choices[i];

    // 모르겠음을 기준으로 얼마나 떨어졌는지가 점수 (1~3점)
    if (choice < 4) score[disagree] += 4 - choice;
    else if (choice > 4) score[agree] += choice - 4;
  });

  // 지표별로 점수가 높은 쪽, 같으면 사전순으로 앞선 쪽(왼쪽 글자)
  const indicators = ['RT', 'CF', 'JM', 'AN'];
  return indicators
    .map(([first, second]) => (score[first] >= score[second] ? first : second))
    .join('');
}
