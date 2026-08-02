function solution(nums) {
  const maxSelect = nums.length / 2;
  const uniqueTypes = new Set(nums).size;

  return Math.min(uniqueTypes, maxSelect);
}
