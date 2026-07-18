function solution(cards1, cards2, goal) {
  let i = 0;
  let j = 0;

  for (let word of goal) {
    // cards1의 현재 단어와 일치하는지 확인 (배열 범위를 벗어나지 않았는지도 체크)
    if (i < cards1.length && cards1[i] === word) {
      i++;
    }
    // cards2의 현재 단어와 일치하는지 확인
    else if (j < cards2.length && cards2[j] === word) {
      j++;
    }
    // 둘 다 일치 X
    else {
      return "No";
    }
  }

  return "Yes";
}
