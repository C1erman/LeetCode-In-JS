# 回文数のPalindrome Number

## 题目

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

<!--more-->

**进阶:**

你能不将整数转为字符串来解决这个问题吗？

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

> Example

```
Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

```
Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

## 思路

相比于回文字符串来说，判断一个数字是不是回文的显然简单得多——数字具备**计算特性**。

虽然题目说了最好不要使用转换为字符串的方法，但我还是用了——简单嘛。

从字符串的中心位置向两边查询，判断取到的两个字符是否相等即可。

当然，针对字符串的奇偶长度需要进行处理。

好几次都忘了`JavaScript`中的`/`结果不是整数，来看看有什么[有趣的取整方法](http://www.seefun.club/2019/03/30/Number-in-JavaScript/#funny_method)吧。

## 实现

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0) return false;
    let num=(x).toString();
    let len=num.length;
    let i,j;
    len%2==0 ?(i= Math.floor(len/2)-1,j=Math.floor(len/2)) : i=j=Math.floor(len/2);
    while(i>=0&&j<num.length){
        if(num[i]==num[j]){i--;j++;}
        else return false;
    }
    return true;
};
```

## 成绩

Runtime:  **244 ms**

Memory Usage: **46.1 MB**

Status:  **Accepted**

faster than **83.96%** of JavaScript online submissions

less than **8.98%** of JavaScript online submissions

## 改良

官方说尽量不将整数转为字符串。

其实也比较好办：对给定的数字不断地对10求余，就能得到一个完全或部分反转的数，将这个反转的数与原来的数进行比较，便可以得到结果。

值得注意的是：当数字能被10整除的时候，除了0，其它一定是非回文数，就像`10`一样，这在部分反转时是十分重要的界定条件。

但为什么部分反转耗的时间更长？

### 数字完全反转

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0) return false;
    var res=0,num=x;
    while(num){
        res=res*10+num%10;
        //取整
        num=(num/10)>>0;
    }
    return res==x;
};
```

Runtime:  **236 ms**

Memory Usage: **45.1 MB**

Status:  **Accepted**

faster than **96.68%** of JavaScript online submissions

less than **69.89%** of JavaScript online submissions

### 数字部分反转

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x<0||(x%10==0&&x!=0)) return false;
    let res=0,num=x;
    while(num > res){
        res=res*10+num%10;
        num=(num/10)>>0;
    }
    //偶数 | 奇数
    return res==num||num==(res/10)>>0;
};
```

Runtime:  **240 ms**

Memory Usage: **45 MB**

Status:  **Accepted**

faster than **90.48%** of JavaScript online submissions

less than **72.14%** of JavaScript online submissions