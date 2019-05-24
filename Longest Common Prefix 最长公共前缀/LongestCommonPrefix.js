/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix_my = function(strs) {
	if (strs.length === 0) return '';
	let min = strs[0];
	for (let i of strs) {
		i.length < min.length ? min = i : null;
	}
	if (min.length === 0) return '';
	let ans;
	for (let i = 0; i < min.length; i++) {
		let reg = new RegExp(`^${min.slice(0,i+1)}`);
		let res = strs.every(v => reg.test(v));
		if (!res) {
			break;
		}
		ans = min.slice(0, i + 1);
	}
	return ans || '';
};
var longestCommonPrefix_withRow = function(strs) {
	if (strs.length === 0 || strs === null) return '';
	for (let i = 0; i < strs[0].length; i++) {
		str = strs[0].charAt(i);
		for (let j = 1; j < strs.length; j++) {
			if (i === strs[j].length || strs[j].charAt(i) !== str) {
				return strs[0].substring(0, i);
			}
		}
	}
	return strs[0];
};
var longestCommonPrefix_shortest = function(strs) {
	if (strs.length === 0) return '';
	let prefix = strs[0];
	for (let i = 1; i < strs.length; i++) {
		while (strs[i].indexOf(prefix) !== 0) {
			prefix = prefix.substring(0, prefix.length - 1);
			if (prefix.length === 0) return '';
		}
	}
	return prefix;
};