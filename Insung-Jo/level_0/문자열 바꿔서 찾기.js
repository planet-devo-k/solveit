function solution(myString, pat) {
  const answer = myString.split("");

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] !== "A") {
      answer[i] = "A";
    } else answer[i] = "B";
  }

  return answer.join("").includes(pat) ? 1 : 0;
}
