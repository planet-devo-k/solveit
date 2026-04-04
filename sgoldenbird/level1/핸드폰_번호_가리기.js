function solution(phone_number) {
  const hidden = "*".repeat(phone_number.length - 4);
  const last = phone_number.slice(-4);

  return hidden + last;
}
