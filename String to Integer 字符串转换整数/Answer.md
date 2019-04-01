# 字符串转换整数のString to Integer

## 题目

请你来实现一个 `atoi` 函数，使其能将字符串转换成整数。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

<!--more-->

**说明：**

假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[−2^31 , 2^31−1]。如果数值超过这个范围，请返回INT_MAX或INT_MIN。

Implement `atoi` which converts a string to an integer.

**Note:**

- Only the space character `' '` is considered as whitespace character.
- Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.

> Example

```
Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
```

```
Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed.
```

```
Input: "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
             Thefore INT_MIN (−231) is returned.
```

## 思路

说曹操，曹操到。

我刚一头雾水地写了[我不知道的Number](http://www.seefun.club/2019/03/30/Number-in-JavaScript/)，就又遇到了关于数字转换的问题。

但是，总感觉这道题毫无意义，在生产环境下，我们尽可能的使用着官方提供的可爱`API`们。

就像这道题一样，`parseInt()`函数完全可以胜任题目功能。

当然，如果是其它语言，实现这个功能也很简单。

总的来说，以算法角度来讲，是失败的。

## 实现

你需要注意的是：

- 在`JavaScript`中，`NaN`是唯一一个与自己不相等的人，更不要说严格相等了，判断一个数是不是`NaN`的方法是全局函数`isNaN()`
- `NaN`的类型居然是`Number`

利用`parseInt()`，并对计算值进行范围、`NaN`判断，并做相应处理即可。

```javascript
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let ans;
    try{
        ans=parseInt(str);
    }catch{
        return 0;
    }finally{
        if(isNaN(ans)) return 0;
        if(Math.abs(ans)>0x7FFFFFFF) return ans<0 ? -Math.pow(2,31) : Math.pow(2,31)-1;
        return ans;
    }
};
```

异常捕获不是必须的。

## 成绩

Runtime:  **84 ms**

Memory Usage: **35.6 MB**

Status:  **Accepted**

faster than **93.83%** of JavaScript online submissions

less than **86.90%** of JavaScript online submissions

## 改良

又遇到大佬了 = =

巧妙的构思让我甘拜下风。

强！

```javascript
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648);
};
```

Runtime:  **80 ms**

Memory Usage: **35.8 MB**

Status:  **Accepted**

faster than **96.84%** of JavaScript online submissions

less than **66.21%** of JavaScript online submissions