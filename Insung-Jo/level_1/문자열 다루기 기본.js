function solution(s) {
  const regex = /[a-zA-Z]/g;

  return s.length === 4 || s.length === 6 ? !regex.test(s) : false;
}
