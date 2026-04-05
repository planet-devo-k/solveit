function solution(phone_number) {
  return [...Array(phone_number.length)]
    .map((item, idx) => {
      return phone_number.length - idx <= 4 ? phone_number[idx] : "*";
    })
    .join("");
}
