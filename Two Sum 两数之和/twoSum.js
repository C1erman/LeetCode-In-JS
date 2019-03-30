/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum_direct = (nums, target) => {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] == target) {
				return new Array(i, j);
			}
		}
	}
}
var twoSum_twiceHash = function(nums, target) {
	let hash = new Object();
	for (let i = 0; i < nums.length; i++) {
		hash[nums[i]] = i;
	}
	for (let i = 0; i < nums.length; i++) {
		let lefts = target - nums[i];
		if ((lefts in hash) && hash[lefts] != i) {
			return new Array(i, hash[lefts]);
		}
	}
};
var twoSum_onceHash = function(nums, target) {
	let hash = new Object();
	for (let i = 0; i < nums.length; i++) {
		let lefts = target - nums[i];
		if (lefts in hash) {
			return new Array(i, hash[lefts]);
		}
		hash[nums[i]] = i;
	}
};