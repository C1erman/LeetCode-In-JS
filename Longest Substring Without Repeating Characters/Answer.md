# 无重复字符的最长字串のLongest Substring Without Repeating Characters

## 题目

给定一个字符串，请你找出其中不含有重复字符的**最长子串**的长度。

Given a string, find the length of the **longest substring** without repeating characters.

> Example
>
> ```
> Input: "abcabcbb"
> Output: 3 
> Explanation: The answer is "abc", with the length of 3. 
> ```
>
> ```
> Input: "bbbbb"
> Output: 1
> Explanation: The answer is "b", with the length of 1.
> ```
>
> ```
> Input: "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3. 
>              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
> ```

## 思路

看到“串”就想到学习数据结构时研究KMP算法的日子，简直头痛。

但是本题的要求相对简单：只是找出不含有**重复字符**的最长字串的长度。

想到保存各个字符的下标对减少回溯会起帮助，于是就想到了`Hash`表。

你需要了解的有：

1. `if('')->false` `if(' ')->true`
2. 使用`rest`操作符可以直接将字符串**简单分割**后返回数组，如果有特殊要求，则可以使用`String.split('')`。

对给定的字符串做循环操作，每次取当前字符，检索是否在`Hash`表中已经存在。

`Hash`表的结构很简单，为

```
HashNode{
    '某个字符' : index
}
Example
HashNode{
    'a' : 0,
    'b' : 1,
    etc
}
```

声明一个对象作为`Hash`表，声明一个`nums`数组用于存放每次回溯前`Hash`表的长度。

如果存在，则表明有**字符重复**，则需要回溯，回溯到当前字符在`Hash`表中最后一次出现的位置，同时清空`Hash`表。

如果不存在，则将该字符以上述`HashNode`的格式存放于该`Hash`表中。

最后返回的是数组`nums`的最大值`Array.max(nums)`。

## 实现

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(!s) return 0;
    let a=new Object(),max=0,nums=new Array(),repeat=false;
    for(let i=0;i<s.length;i++){
        s[i] in a ? ( i = a[s[i]] , nums.push(Object.keys(a).length) , a=new Object()) : a[s[i]] = i;
    }
    repeat ? null: nums.push(Object.keys(a).length);
    return Math.max(...nums)
};
```

## 成绩

Runtime:  **528 ms**

Memory Usage:  **61 MB**

Status:  **Accepted**

faster than **17.70%** of JavaScript online submissions

less than **12.98%** of JavaScript online submissions

## 改良

一个显眼的地方就是`a=new Object()`，在每次回溯的时候都会重新初始化一个对象，这占用了大量的内存空间。

此外，每次回溯时`index`值的计算显然可以通过相关的算法来进行优化。

