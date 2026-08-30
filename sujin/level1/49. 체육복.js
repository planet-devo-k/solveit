function solution(n, lost, reserve) {
  const realLost = lost.filter((x) => !reserve.includes(x));
  const realReserve = reserve.filter((x) => !lost.includes(x));

  let answer = n - realLost.length;

  for (let student of realLost) {
    if (realReserve.includes(student - 1)) {
      realReserve.splice(realReserve.indexOf(student - 1), 1);
      answer++;
    } else if (realReserve.includes(student + 1)) {
      realReserve.splice(realReserve.indexOf(student + 1), 1);
      answer++;
    }
  }

  return answer;
}
