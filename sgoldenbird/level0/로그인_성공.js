function solution(id_pw, db) {
  const [id, pw] = id_pw;
  const dbMap = new Map(db);

  if (!dbMap.has(id)) {
    return "fail";
  }

  if (dbMap.get(id) !== pw) {
    return "wrong pw";
  }

  return "login";
}
