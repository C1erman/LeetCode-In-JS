/**
 * @param {number} num
 * @return {string}
 */
var intToRoman_my = function(num) {
    const single = new Map([[1,'I'],[4,'IV'],[5,'V'],[9,'IX']]),
          ten = new Map([[1,'X'],[4,'XL'],[5,'L'],[9,'XC']]),
          hundred = new Map([[1,'C'],[4,'CD'],[5,'D'],[9,'CM']]),
          thousand = new Map([[1,'M']]);
    let s_num = (num).toString().split('');
    let ans = '';
    s_num.map((v,i)=>{
        // typeof v is string
        switch (s_num.length - i){
            case 1:{
                ans+=(single.get(parseInt(v))||`${'V'.repeat(v/5)+'I'.repeat(v%5)}`);
                break;
            }
            case 2:{
                ans+=(ten.get(parseInt(v))||`${'L'.repeat(v/5)+'X'.repeat(v%5)}`);
                break;
            }
            case 3:{
                ans+=(hundred.get(parseInt(v))||`${'D'.repeat(v/5)+'C'.repeat(v%5)}`);
                break;
            }
            case 4:{
                ans+=(thousand.get(parseInt(v))||`${'M'.repeat(v%5)}`);
            }
        }
    });
    return ans;
};