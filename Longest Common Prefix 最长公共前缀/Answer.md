# 最长公共前缀のLongest Common Prefix

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

所有输入只包含小写字母 `a-z` 。

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

> Example

```
Input: ["flower","flow","flight"]
Output: "fl"
```

```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

## 思路

既然是找一个字符串数组的最长公共前缀，那么——在最长公共前缀存在的前提下——该字符串数组中长度最短的字符串，必然是这个公共前缀的超集。

在判断一个字符串`X`是否是最长公共前缀这一点上，我们可以使用正则表达式，针对给定数组的每一项，测试是否以`X`打头，如果是，则证明`X`是最长公共前缀的子集。

该算法的时间复杂度为`O(Log(n))`。

## 实现

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
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
```

## 成绩

Runtime:  **60 ms**

Memory Usage: **34.9 MB**

Status:  **Accepted**

faster than **91.71 %** of JavaScript online submissions

less than **62.75 %** of JavaScript online submissions

## 改良

本题可以使用很多典型的算法来解决。