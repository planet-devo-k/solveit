function solution(id_list, report, k) {
  // 동일한 유저에 대한 중복 신고 제거 (Set 활용)
  const uniqueReports = [...new Set(report)];

  // 신고당한 횟수를 저장할 객체와 각 유저가 신고한 사람들을 기록할 객체 초기화
  const reportedCounts = {}; // { 유저ID: 신고당한 횟수 }
  const userReports = {}; // { 유저ID: Set([신고한 유저들]) }

  id_list.forEach((id) => {
    reportedCounts[id] = 0;
    userReports[id] = new Set();
  });

  // 신고 기록 파싱 및 집계
  uniqueReports.forEach((item) => {
    const [userId, reportedId] = item.split(" ");
    userReports[userId].add(reportedId);
    reportedCounts[reportedId]++;
  });

  // k번 이상 신고되어 정지된 유저 목록 추출
  const suspendedUsers = new Set();
  for (const id of id_list) {
    if (reportedCounts[id] >= k) {
      suspendedUsers.add(id);
    }
  }

  // id_list 순서대로 각 유저가 받은 결과 메일 수 계산
  return id_list.map((id) => {
    let mailCount = 0;
    // 내가 신고한 유저 중 정지된 유저가 있다면 메일 카운트 증가
    userReports[id].forEach((reportedId) => {
      if (suspendedUsers.has(reportedId)) {
        mailCount++;
      }
    });
    return mailCount;
  });
}

// 더 간단한 풀이
function solution(id_list, report, k) {
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });
  let counts = new Map();
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }
  let good = new Map();
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }
  let answer = id_list.map((a) => good.get(a) || 0);
  return answer;
}
