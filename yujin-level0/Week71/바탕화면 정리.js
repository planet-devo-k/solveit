function solution(wallpaper) {
  let minRow = Infinity;
  let minCol = Infinity;
  let maxRow = -Infinity;
  let maxCol = -Infinity;

  for (let i = 0; i < wallpaper.length; i++) {
    for (let j = 0; j < wallpaper[i].length; j++) {
      if (wallpaper[i][j] === "#") {
        minRow = Math.min(minRow, i);
        minCol = Math.min(minCol, j);
        maxRow = Math.max(maxRow, i);
        maxCol = Math.max(maxCol, j);
      }
    }
  }

  // max의 경우 드래그의 끝점을 기준으로 드래그해야하므로 +1
  return [minRow, minCol, maxRow + 1, maxCol + 1];
}
