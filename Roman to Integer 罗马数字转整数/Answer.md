# 罗马数字转整数のRoman to Integer

## 题目

罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

```javascript
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

需要注意的是罗马数字中的特殊情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

## 思路

比起将整数转换为罗马数字，将罗马数字转换为整数显然更加简单，因为给你的罗马数字是肯定符合规范的。

本题有两种求解思路：

1. 使用规律：发现`V`时，如果左边一位是`I`的话，就给结果加上`4`，其它情况加`5`。对所有特殊情况`V`、`X`、`L`、`C`、`D`、`M`均需要这样考虑，以对应所有的特殊情况。
2. 第二种解题思路是第一种的抽象：每次比较当前位对应的罗马数字和右一位对应的罗马数字，如果当前位较小，则说明是特殊情况，取这两位对应的罗马数字加上结果即可。

为了加快寻找的速度，我们同样可以将所有的罗马数字与其对应的整数放在一个`Map`里面。

## 实现

- 求解思路一：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let total = 0;
    
    for (let i = 0; i < s.length; i++){
        switch (s[i]){
            case 'I':
                if (s[i+1] == 'V'){total += 4; i++}
                else if (s[i+1] == 'X'){total += 9; i++}
                else {total += 1};
                break;
            case 'X':
                if (s[i+1] == 'L'){total += 40; i++}
                else if (s[i+1] == 'C'){total += 90; i++}
                else {total += 10};
                break;
            case 'C':
                if (s[i+1] == 'D'){total += 400; i++}
                else if (s[i+1] == 'M'){total += 900; i++}
                else {total += 100};
                break;
            case 'V':
                total += 5;
                break;                
            case 'L':
                total += 50;
                break;     
            case 'D':
                total += 500;
                break;     
            case 'M':
                total += 1000;
                break;   
        }
    }
    
    return total;
};
```

- 求解思路二：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
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
```

## 成绩

在无算法上的差异时，我更倾向于求解思路二，因为它要快上一些：

Runtime:  **144 ms**

Memory Usage: **43 MB**

Status:  **Accepted**

faster than **98.50 %** of JavaScript online submissions

less than **11.08 %** of JavaScript online submissions

<del>果然还是一如既往的吃内存啊。</del>