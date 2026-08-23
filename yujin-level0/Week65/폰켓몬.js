function solution(nums) {
  const maxSelect = nums.length / 2;
  const uniqueCount = new Set(nums).size;

  // 둘 중 더 작은 값을 반환
  return Math.min(uniqueCount, maxSelect);
}
