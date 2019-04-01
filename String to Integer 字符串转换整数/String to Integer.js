/**
 * @param {string} str
 * @return {number}
 */
var myAtoi_my = function(str) {
    let ans;
    try {
        ans = parseInt(str);
    } catch {
        return 0;
    } finally {
        if (isNaN(ans)) return 0;
        if (Math.abs(ans) > 0x7FFFFFFF) return ans < 0 ? -Math.pow(2, 31) : Math.pow(2, 31) - 1;
        return ans;
    }
};
var myAtoi = function(str) {
    return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648);
};