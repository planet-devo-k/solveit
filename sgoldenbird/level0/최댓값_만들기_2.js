function solution(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  if (
    sortedNumbers[0] * sortedNumbers[1] >
    sortedNumbers[sortedNumbers.length - 1] *
      sortedNumbers[sortedNumbers.length - 2]
  ) {
    return sortedNumbers[0] * sortedNumbers[1];
  } else {
    return (
      sortedNumbers[sortedNumbers.length - 1] *
      sortedNumbers[sortedNumbers.length - 2]
    );
  }
}
