function solution(food) {
  var answer = "0";
  for (var i = food.length - 1; i > 0; i--) {
    if (food[i] > 1) {
      for (var j = 1; j <= food[i] / 2; j++) {
        answer = i + answer + i;
      }
    }
  }
  return answer;
}

// 다른 풀이
// function solution(food) {
//     let part = [];
//     for (let i = 1; i < food.length; i++) {
//         part.push(i.toString().repeat(Math.floor(food[i] / 2)));
//     }

//     return [part.join(''), part.reverse().join('')].join('0');
// }
