function solution(cards1, cards2, goal) {
  for (let word of goal) {
    // cards1의 맨 앞 단어와 일치하면 cards1에서 제거
    if (cards1[0] === word) {
      cards1.shift();
    }
    // cards2의 맨 앞 단어와 일치하면 cards2에서 제거
    else if (cards2[0] === word) {
      cards2.shift();
    }
    // 어느 쪽 카드 뭉치의 맨 앞 단어와도 일치하지 않는다면 실패
    else {
      return "No";
    }
  }

  return "Yes";
}
