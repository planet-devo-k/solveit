function solution(price) {
  if (price >= 500000) {
    return Math.floor(price * 0.8);
  } else if (price >= 300000) {
    return Math.floor(price * 0.9);
  } else if (price >= 100000) {
    return Math.floor(price * 0.95);
  } else return price;
}

// 다른 풀이
// function solution(price) {
//     price = price>=500000?price*0.8:price>=300000?price*0.9:price>=100000?price*0.95:price;
//     return ~~(price);
// }
