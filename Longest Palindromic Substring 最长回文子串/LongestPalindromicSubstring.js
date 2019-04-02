/**
 * @param {string} s
 * @return {string}
 */
/*暴力循环法*/
var longestPalindrome_bad = function(s) {
    if (is_p(s)) return s;
    let n = s.length,
        i = 0,
        j = n - 1,
        len = j - i;
    let set = new Set();
    while (i <= j) {
        let subStr = s.substring(i, j);
        if (is_p(subStr)) {
            return subStr;
        } else {
            set.has(i) ? null : (set.add(i), i++, j = i + len);
            if (j == n) {
                subStr = s.substring(i, j);
                if (is_p(subStr)) {
                    return subStr;
                }
                set.clear();
                i = 0;
                len--;
                j = i + len;
            }
        }
    }
}
/*the func is right for any cases except ' ' because NaN!=NaN in js*/
var is_p = (s) => {
    let n = s.length / 2;
    let lower = Math.floor(n),
        higher = Math.ceil(n);
    let sub1 = s.substring(0, lower),
        sub2 = s.substring(higher).split('').reverse().join('');
    return Object.is(sub1, sub2);
}
/*中心扩展法*/
var longestPalindrome_center = function(s) {
    if (s == null || s.length < 1) return '';
    let start = 0,
        end = 0;
    for (let i = 0; i < s.length; i++) {
        let len_odd = aroundStr(s, i, i);
        let len_even = aroundStr(s, i, i + 1);
        let len = Math.max(len_odd, len_even);
        (len > end - start) ? (start = Math.round(i - (len - 1) / 2), end = i + len / 2) : null;
    }
    return s.substring(start, end + 1);
}
var aroundStr = (s, start, end) => {
    let l = start,
        r = end;
    while (l >= 0 && r < s.length && s.charAt(l) == s.charAt(r)) {
        l--;
        r++;
    }
    return r - l - 1;
}
/*马拉车算法*/
var longestPalindrome_best = function(s) {
    // 首先插入一个#
    let newstr = fillWithSharp(s);
    // 以newStr每个字符串为中心的回文串的长度数组，最小为1
    let len = [];
    // 最长的回文串的右端点
    let longestPalindromeRight = 0;
    // 最长的回文串的中心点
    let longestPalindromeCenter = 0;
    // 记录最长回文长度
    let longestPalindrome = 0;
    //计算数组
    for (let i = 0; i < newstr.length; i++) {
        let needExpand = true;
        let spandStart = i + 1;
        // 在右边界内的时候寻找对称点
        if (i < longestPalindromeRight) {
            // 找关于中心的对称点j
            const j = 2 * longestPalindromeCenter - i;
            // 如果这时候还在右边界内，则不需要扩展
            if (longestPalindromeRight >= i + len[j]) {
                len[i] = len[j];
                needExpand = false
            } else {
                spandStart = longestPalindromeRight + 1
            }
        }
        // 这里是拓展的代码
        if (needExpand) {
            // 这里雷同上面的single拓展
            while (spandStart < newstr.length && 2 * i - spandStart >= 0) {
                if (newstr[spandStart] === newstr[2 * i - spandStart]) {
                    spandStart++
                } else {
                    break
                }
            }
        }
        len[i] = spandStart - i;
        if (len[i] > longestPalindrome) {
            longestPalindromeRight = spandStart - 1;
            longestPalindrome = len[i];
            longestPalindromeCenter = i;
        }
    }
    // 找到len中的最大值索引
    const originRight = longestPalindromeRight / 2;
    const originLongestPalindrome = longestPalindrome - 1;
    return s.substr(originRight - originLongestPalindrome, originLongestPalindrome)
};
var fillWithSharp = (s) => {
    return String.prototype.concat('#', s.split('').join('#'), '#');
}