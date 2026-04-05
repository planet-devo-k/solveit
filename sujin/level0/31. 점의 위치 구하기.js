function solution(dot) {
  const AXIS_X = Math.sign(dot[0]);
  const AXIS_Y = Math.sign(dot[1]);
  if (AXIS_X === 1 && AXIS_Y === 1) {
    return 1;
  } else if (AXIS_X === -1 && AXIS_Y === 1) {
    return 2;
  } else if (AXIS_X === -1 && AXIS_Y === -1) {
    return 3;
  } else {
    return 4;
  }
}
