function solution(s) {
  const isLengthValid = s.length === 4 || s.length === 6;

  if (!isLengthValid) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] < "0" || s[i] > "9") {
      return false;
    }
  }

  return true;
}
