# 整数转罗马数字のInteger to Roman

## 题目

罗马数字包含以下七种字符： `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`.  Because the one is before the five we subtract it making four. The same  principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

> Example

```javascript
Input: 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

```javascript
Input: 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## 思路

这道题还是蛮简单的，按照我们在人脑内的转换规则即可。

我们看到一个数字，首先会去判断这个数字是几位数，接着按照从高到低的顺序，将一位位数字转换成罗马数字。而一位数字对应转换为一个罗马数字的过程，是以转换表为参考进行的，遵循规则即可。。

综上，我们需要的信息就是：

1. 数字的位数，将给定的数字转为数组，`length-i`即是数字的位数。
2. 转换表，使用`Map`结构便能在线性时间内进行查找。

得出函数不过是顺水推舟罢了。

<del>真就有人写好所有的取值情况啊</del>

## 实现

```javascript
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
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
```

## 成绩

Runtime:  **164 ms**

Memory Usage: **43.8 MB**

Status:  **Accepted**

faster than **80.66%** of JavaScript online submissions

less than **1%** of JavaScript online submissions

<del>没错，我就是最吃内存的那个</del>