// https://school.programmers.co.kr/learn/courses/30/lessons/86491

function solution(sizes) {
  const [width, height] = sizes.reduce(
    ([maxW, maxH], [w, h]) => [
      Math.max(maxW, Math.max(w, h)),
      Math.max(maxH, Math.min(w, h)),
    ],
    [0, 0],
  );

  return width * height;
}
