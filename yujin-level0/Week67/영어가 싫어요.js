function solution(numbers) {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  words.forEach((word, index) => {
    // 단어를 기준으로 쪼갠 뒤 숫자로 이어 붙임
    numbers = numbers.split(word).join(index);
  });

  return Number(numbers);
}
