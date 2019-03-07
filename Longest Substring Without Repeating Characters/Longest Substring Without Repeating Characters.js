/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring_longest = function(s) {
	if (!s) return 0;
	let a = new Object(),
		max = 0,
		nums = new Array(),
		repeat = false;
	for (let i = 0; i < s.length; i++) {
		s[i] in a ? (i = a[s[i]], nums.push(Object.keys(a).length), a = new Object()) : a[s[i]] = i;
	}
	repeat ? null : nums.push(Object.keys(a).length);
	return Math.max(...nums)
};
var lengthOfLongestSubstring_Sliding = function(s) {
	let n = s.length;
	let ans = 0,
		i = 0,
		j = 0;
	let set = new Set();
	while (i < n && j < n) {
		if (!set.has(s[j])) {
			set.add(s[j++]);
			ans = Math.max(ans, j - i);
		} else {
			set.delete(s[i++]);
		}
	}
	return ans;
};
var lengthOfLongestSubstring_fastest = function(s) {
	let n = s.length,
		answer = 0;
	let map = new Map();
	for (let i = 0, j = 0; j < n; j++) {
		if (map.has(s[j])) i = Math.max(map.get(s[j]), i);
		answer = Math.max(answer, j - i + 1);
		map.set(s[j], j + 1);
	}
	return answer;
};