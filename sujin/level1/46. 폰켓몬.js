function solution(nums) {
  const maxCount = nums.length / 2;
  const typeCount = new Set(nums).size;

  return Math.min(maxCount, typeCount);
}
