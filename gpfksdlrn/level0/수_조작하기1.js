// https://school.programmers.co.kr/learn/courses/30/lessons/181926

function solution(n, control) {
  const commands = {
    w: 1,
    s: -1,
    d: 10,
    a: -10,
  };

  return Array.from(control).reduce(
    (result, command) => result + commands[command],
    n,
  );
}
