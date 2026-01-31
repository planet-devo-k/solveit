function solution(a, b) {
  if (String(a) + String(b) > String(b) + String(a)) {
    return Number(String(a) + String(b));
  } else {
    return Number(String(b) + String(a));
  }
  if (a === b) return Number(String(a) + String(b));
}
