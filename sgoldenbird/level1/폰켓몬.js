function solution(nums) {
  const category = new Set(nums);
  const takeCount = nums.length / 2;

  return Math.min(category.size, takeCount);
}
