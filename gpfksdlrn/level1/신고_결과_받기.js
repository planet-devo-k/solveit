// https://school.programmers.co.kr/learn/courses/30/lessons/92334

function solution(id_list, report, k) {
  const reportedCount = {};
  const mailCount = {};

  // 메일 수 초기화
  id_list.forEach((id) => (mailCount[id] = 0));

  // 중복 신고 제거
  const reports = [...new Set(report)];

  // 신고당한 횟수 세기
  reports.forEach((item) => {
    const [, reported] = item.split(' ');
    reportedCount[reported] = (reportedCount[reported] || 0) + 1;
  });

  // 정지된 유저를 신고한 사람에게 메일 보내기
  reports.forEach((item) => {
    const [reporter, reported] = item.split(' ');

    if (reportedCount[reported] >= k) {
      mailCount[reporter]++;
    }
  });

  return id_list.map((id) => mailCount[id]);
}
