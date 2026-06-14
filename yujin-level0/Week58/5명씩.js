function solution(names) {
  var answer = [];
  for (let i = 0; i < names.length; i += 5) {
    answer.push(names[i]);
  }
  return answer;
}

// 다른 풀이
// const solution = names => names.filter((_, i) => !(i % 5))
