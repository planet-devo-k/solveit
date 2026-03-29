function solution(num_list) {
  for (i = 0; i < num_list.length; i++) {
    if (num_list[i] < 0) {
      return i;
    }
  }
  return -1;
}

// 다른 풀이
// const solution = num_list => num_list.findIndex(v => v < 0)

// function solution(num_list) {
//     let a = num_list.filter(c=> {if(c<0) return c})
//     return num_list.indexOf(a[0])
// }
