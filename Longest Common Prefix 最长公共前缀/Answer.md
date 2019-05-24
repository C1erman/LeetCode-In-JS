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

### 水平扫描法

该方法利用了`String.protptype.indexOf()`来实现了一个字符串是否包含了另一个字符串。

正如该方法的名字那样，水平扫描相邻的两个字符串。以前两个字符串开始，查找这两个字符串之间相同的部分，并拿着这个相同的部分与之后的再进行比较。

在得到两个字符串相同部分这一过程中，总是不断减小期望的长度，直至为`0`，这时将返回`''`。

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length === 0) return '';
    let prefix = strs[0];
    for (let i = 1;i < strs.length; i++){
        while(strs[i].indexOf(prefix) !== 0){
            prefix = prefix.substring(0, prefix.length -1);
            if(prefix.length === 0) return '';
        }
    }
    return prefix;
};
```

Runtime:  **56 ms**

Memory Usage: **34 MB**

Status:  **Accepted**

faster than **96.22 %** of JavaScript online submissions

less than **84.00 %** of JavaScript online submissions

### 水平列扫描法

emmmmmm。

其实这个方法和我的大致上没有什么区别，我是在一开始就找到长度最短的那个字符串，而该方法是在查找过程中避免对超过最短长度的比较。

观察上述水平扫描法，便可以发现有多余的部分——正如我一开始提到的那样——长度最短的字符串，必然是这个公共前缀的超集。

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0 || strs === null) return '';
    for (let i = 0;i < strs[0].length; i++){
        str = strs[0].charAt(i);
        for (let j = 1;j < strs.length; j++){
            if (i === strs[j].length || strs[j].charAt(i) !== str){
                return strs[0].substring(0, i);
            }
        }
    }
    return strs[0];
};
```

Runtime:  **64 ms**

Memory Usage: **35 MB**

Status:  **Accepted**

faster than **69.36 %** of JavaScript online submissions

less than **61.88 %** of JavaScript online submissions

当然，除了这些方法，我们还可以通过**分治算法**、**二分查找法**来解决本题，由于精力有限，就放在下一轮进行研究吧。

<del>说白了就是懒。</del>