function solution(wallpaper) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < wallpaper.length; i++) {
    for (let j = 0; j < wallpaper[i].length; j++) {
      if (wallpaper[i][j] === "#") {
        minX = Math.min(minX, i);
        minY = Math.min(minY, j);
        maxX = Math.max(maxX, i);
        maxY = Math.max(maxY, j);
      }
    }
  }

  return [minX, minY, maxX + 1, maxY + 1];
}
