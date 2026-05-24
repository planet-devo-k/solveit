// https://school.programmers.co.kr/learn/courses/30/lessons/12969

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const [col, row] = data.split(' ').map((v) => Number(v));

  const result = Array(row).fill('*'.repeat(col)).join('\n');
  console.log(result);
});
