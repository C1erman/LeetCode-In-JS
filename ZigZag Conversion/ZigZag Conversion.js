/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert_my = function(s, numRows) {
    if (numRows == 1) return s;
    let len = s.length;
    let repeat = Math.floor(len / (2 * (numRows - 1)));
    let other = len % (2 * (numRows - 1));
    let ans = new Array(numRows);
    let to_use = 2 * (numRows - 1);
    ans.fill('');
    /*填充可重复部分*/
    for (let i = 0; i < repeat; i++) {
        for (let j = 0; j < numRows; j++) {
            ans[j] += s[i * to_use + j];
            if (j != 0 && j != numRows - 1) {
                ans[j] += s[i * to_use + to_use - j];
            }
        }
    }
    /*填充不可重复部分*/
    if (other > numRows) {
        ans.forEach((value, index, arr) => {
            s[len - other + index] ? arr[index] += s[len - other + index] : null;
        });
        let ov = s.substring(len - other + numRows);
        /*ov是超出numRows的部分*/
        for (let i = 0; i < ov.length; i++) {
            ans[numRows - (i + 1) % numRows - 1] += ov[i];
        }
    } else {
        ans.forEach((value, index, arr) => {
            s[len - other + index] ? arr[index] += s[len - other + index] : null;
        });
    }
    return ans.join('')
};
var convert_better = function(s, numRows) {
    if (numRows == 1) return s;
    let len = s.length;
    let ans = new Array(Math.min(numRows, len));
    ans.fill('');
    let down = false;
    let current_row = 0;
    for (let c of s) {
        ans[current_row] += c;
        (current_row == 0 || current_row == numRows - 1) ? down = !down: null;
        down ? current_row++ : current_row--;
    }
    return ans.join('');
};