function solution(survey, choices) {
  const score = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };

  survey.forEach((type, i) => {
    const [disagree, agree] = type;
    const choice = choices[i];

    if (choice < 4) score[disagree] += 4 - choice;
    else if (choice > 4) score[agree] += choice - 4;
  });

  const indicators = ["RT", "CF", "JM", "AN"];

  return indicators.map(([a, b]) => (score[a] >= score[b] ? a : b)).join("");
}
