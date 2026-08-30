// https://school.programmers.co.kr/learn/courses/30/lessons/120883

function solution(id_pw, db) {
  const [id, pw] = id_pw;

  const member = db.find(([memberId]) => memberId === id);

  if (!member) return 'fail';

  return member[1] === pw ? 'login' : 'wrong pw';
}
