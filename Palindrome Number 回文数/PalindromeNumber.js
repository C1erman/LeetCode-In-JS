/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome_my = function(x) {
    if (x < 0) return false;
    let num = (x).toString();
    let len = num.length;
    let i, j;
    len % 2 == 0 ? (i = Math.floor(len / 2) - 1, j = Math.floor(len / 2)) : i = j = Math.floor(len / 2);
    while (i >= 0 && j < num.length) {
        if (num[i] == num[j]) {
            i--;
            j++;
        } else return false;
    }
    return true;
};
var isPalindrome = function(x) {
    if (x < 0) return false;
    var res = 0,
        num = x;
    while (num) {
        res = res * 10 + num % 10;
        //取整
        num = (num / 10) >> 0;
    }
    return res == x;
};
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome_partReverse = function(x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    let res = 0,
        num = x;
    while (num > res) {
        res = res * 10 + num % 10;
        num = (num / 10) >> 0;
    }
    //偶数 | 奇数
    return res == num || num == (res / 10) >> 0;
};