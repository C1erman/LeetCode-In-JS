/**
 * @param {number} x
 * @return {number}
 */
var reverse_my = function(x) {
	let array = (x).toString().split('');
	let minus = array[0] == '-' ? true : false;
	let ans;
	minus ? ans = -parseInt(array.slice(1).reverse().join(''), 10) : ans = parseInt(array.reverse().join(''), 10);
	if (Math.abs(ans) > 2147483648) return 0;
	return ans;
};
var reverse = function(x) {
	let ans = +String(Math.abs(x)).split('').reverse().join('');
	if (ans > 0x7FFFFFFF) {
		return 0;
	}
	return x < 0 ? -ans : ans;
};