function solution(num_list) {
  let arr = [0, 0];
  num_list.forEach((e) => (e % 2 === 0 ? (arr[0] += 1) : (arr[1] += 1)));
  return arr;
}

// 짝홀의 위치를 생각한 풀이법
// function solution(num_list) {
//     var answer = [0,0];
//     for(let a of num_list){
//         answer[a%2] += 1
//     }
//     return answer;
// }
