# 整数反转のReverse Integer

## 题目

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

**注意:**

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

Given a 32-bit signed integer, reverse digits of an integer.

**Note:**
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

> Example

```
Input: 123
Output: 321
```

```
Input: -123
Output: -321
```

```
Input: 1534236469
Output: 0
```

## 思路

这道题没什么好说的，感兴趣的是`JavaScript`中的`Number`类型，包括浮点型和整型，我会专门写一篇文章来详细介绍。

说到反转，首先想起的就是`Array.reverse()`，当然，你也可以用求余（不是求模）运算符`%`来一位位的存储数字，手动反转。

因此，首先将输入数字转为字符串，再转为数组，取首位判断是不是负数。之后将数组反转，转为字符串，使用`parseInt()`重新转为数字即可。

当然，判断**反转后的**数字是否越界也是必不可少的一步。

## 实现

```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let array=(x).toString().split('');
    let minus=array[0]=='-'?true:false;
    let ans;
    minus?ans=-parseInt(array.slice(1).reverse().join(''),10):ans=parseInt(array.reverse().join(''),10);
    if(Math.abs(ans)>2147483648) return 0;
    return ans;
};
```

## 成绩

Runtime:  **88 ms**

Memory Usage: **35.8 MB**

Status:  **Accepted**

faster than **66.68%** of JavaScript online submissions

less than **76.24%** of JavaScript online submissions

## 改良

本题算法程度上已难以有根本性改良，因为你总是绕不开对数字是否越界进行判断。

但是，代码简洁性及内存空间上的消耗依然可以改良。

以下为改良代码简洁性一例：

```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let ans = +String(Math.abs(x)).split('').reverse().join('');
    if (ans > 0x7FFFFFFF) {
        return 0;
    }
    return x < 0 ? -ans : ans;
};
```

我就很难想到直接使用十六进制字面量 = =

Runtime:  **84 ms**

Memory Usage: **35.8 MB**

Status:  **Accepted**

faster than **85.46%** of JavaScript online submissions

less than **71.74%** of JavaScript online submissions