function solution(today, terms, privacies) {
  var answer = [];
  const termMap = {};

  const convertToDays = (dateStr) => {
    const [year, month, day] = dateStr.split(".").map(Number);
    return year * 12 * 28 + month * 28 + day;
  };

  const todayDays = convertToDays(today);

  terms.forEach((term) => {
    const [type, month] = term.split(" ");
    termMap[type] = Number(month) * 28;
  });

  privacies.forEach((privacy, index) => {
    const [dateStr, type] = privacy.split(" ");
    const collectedDays = convertToDays(dateStr);
    const validPeriodDays = termMap[type];

    if (collectedDays + validPeriodDays <= todayDays) {
      answer.push(index + 1);
    }
  });

  return answer;
}
