// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function solution(today, terms, privacies) {
  const termsMap = getTermsMap(terms);
  const todayDays = toDays(today);
  const result = [];

  privacies.forEach((privacy, index) => {
    const [date, type] = privacy.split(' ');
    const expiredDate = toDays(date) + termsMap[type] * 28;

    // 만료일이 오늘보다 이전이면 파기
    if (todayDays >= expiredDate) {
      result.push(index + 1);
    }
  });

  return result;
}

// 약관 종류별 유효기간 저장
function getTermsMap(terms) {
  const termsMap = {};

  terms.forEach((term) => {
    const [type, months] = term.split(' ');
    termsMap[type] = Number(months);
  });

  return termsMap;
}

// 날짜를 일수로 변환 (모든 달은 28일)
function toDays(date) {
  const [year, month, day] = date.split('.').map(Number);
  return (year * 12 + month) * 28 + day;
}
