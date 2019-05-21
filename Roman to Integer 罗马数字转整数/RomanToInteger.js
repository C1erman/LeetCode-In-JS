/**
 * @param {string} s
 * @return {number}
 */
var romanToInt_my = function(s) {
    let chart = new Map([['I',1],['V',5],['X',10],['L',50],['C',100],
                         ['D',500],['M',1000],['IV',4],['IX',9],['XL',40],
                         ['XC',90],['CD',400],['CM',900]]);
    let ans = 0;
    for(let i=0; i<s.length; i++){
        let a = chart.get(s[i]),
            b = chart.get(s[i+1]) || 0;
        a < b ? (ans+=chart.get(s[i]+s[i+1]),i++) : ans+=a;
    }
    return ans;
};