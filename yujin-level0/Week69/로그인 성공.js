function solution(id_pw, db) {
  let [userId, userPw] = id_pw;
  for (let [dbId, dbPw] of db) {
    if (userId === dbId) {
      return userPw === dbPw ? "login" : "wrong pw";
    }
  }
  return "fail";
}

// 다른 풀이
function solution(id_pw, db) {
  const [id, pw] = id_pw;
  const map = new Map(db);
  return map.has(id) ? (map.get(id) === pw ? "login" : "wrong pw") : "fail";
}
