/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
	let res = [...nums1, ...nums2].sort((a, b) => {
		return a - b;
	});
	let middle = 0,
		half = (res.length / 2) - 1;
	half.toString().indexOf('.') < 0 ? middle = (res[half] + res[half + 1]) / 2 : middle = res[Math.floor(half) + 1];
	return middle;
};