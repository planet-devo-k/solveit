function solution(name, yearning, photo) {
  const memoryScores = new Map();

  for (let i = 0; i < name.length; i++) {
    memoryScores.set(name[i], yearning[i]);
  }

  return photo.map((p) =>
    p.reduce((acc, cur) => acc + (memoryScores.get(cur) || 0), 0),
  );
}
