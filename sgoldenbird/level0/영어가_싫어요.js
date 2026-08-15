function solution(numbers) {
  const numWords = [
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

  numWords.forEach((word, index) => {
    numbers = numbers.replaceAll(word, index);
  });

  return Number(numbers);
}
