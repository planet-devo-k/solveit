function solution(n, arr1, arr2) {
  return arr1.map((val, idx) => {
    let binary = (val | arr2[idx]).toString(2);

    binary = binary.padStart(n, "0");

    return binary.replace(/1/g, "#").replace(/0/g, " ");
  });
}
