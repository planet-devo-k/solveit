function solution(phone_num) {
  let arr = "";
  let len = phone_num.length;

  for (let i = 0; i < len - 4; i++) {
    arr += "*";
  }
  for (let j = len - 4; j < len; j++) {
    arr += phone_num[j];
  }
  return arr;
}

// 다른풀이
// return "*".repeat(phone_number.length - 4) + phone_number.slice(-4);
// 또는
// function hide_numbers(s){
//   return s.replace(/\d(?=\d{4})/g, "*");
// }
