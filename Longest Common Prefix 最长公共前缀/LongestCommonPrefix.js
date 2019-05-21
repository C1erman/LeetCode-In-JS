/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix_my = function(strs) {
    if(strs.length === 0) return '';
    let min = strs[0];
    for(let i of strs){
        i.length < min.length ? min = i : null;
    }
    if(min.length === 0) return '';
    let ans;
    for(let i = 0; i < min.length; i++){
        let reg = new RegExp(`^${min.slice(0,i+1)}`);
        let res = strs.every(v=>reg.test(v));
        if(!res){
            break;
        }
        ans = min.slice(0,i+1);
    }
    return ans || '';
};