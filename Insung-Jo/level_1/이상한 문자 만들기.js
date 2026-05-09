function solution(s) {
  return s
    .split(" ")
    .map((word) =>
      [...word]
        .map((w, index) =>
          index % 2 === 0 ? w.toUpperCase() : w.toLowerCase(),
        )
        .join(""),
    )
    .join(" ");
}
