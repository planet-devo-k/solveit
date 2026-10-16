// https://school.programmers.co.kr/learn/courses/30/lessons/42576

function solution(participant, completion) {
  const count = {};

  // 참가자별 인원수 집계
  participant.forEach((name) => {
    count[name] = (count[name] || 0) + 1;
  });

  // 완주자 수만큼 차감
  completion.forEach((name) => {
    count[name]--;
  });

  // 완주하지 못한 선수 찾기
  return participant.find((name) => count[name] > 0);
}
