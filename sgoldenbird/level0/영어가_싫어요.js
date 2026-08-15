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

  return Number(
    words.reduce((str, word, i) => str.replaceAll(word, i), numbers),
  );
}
