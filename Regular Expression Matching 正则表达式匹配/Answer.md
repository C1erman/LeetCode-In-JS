# 正则表达式匹配のRegular Expression Matching

## 题目

给定一个字符串 (`s`) 和一个字符模式 (`p`)。实现支持 `'.'` 和 `'*'` 的正则表达式匹配。

> '.' 匹配任意单个字符。
> '*' 匹配零个或多个前面的元素。

匹配应该覆盖**整个**字符串 (`s`) ，而不是部分字符串。

**说明:**

- `s` 可能为空，且只包含从 `a-z` 的小写字母。
- `p` 可能为空，且只包含从 `a-z` 的小写字母，以及字符 `.` 和 `*`。

Given an input string (`s`) and a pattern (`p`), implement regular expression matching with support for `'.'` and `'*'`.

```
'.' Matches any single character.
'*' Matches zero or more of the preceding element.
```

The matching should cover the **entire** input string (not partial).

> Example

```
Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

```
Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

```
Input:
s = "aab"
p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
```

## 思路

哎，引发我深思啊。

我到底现在还只是一个`API`的使用者，侥幸深入学习了一部分知识就有些忘乎所以了。

相信多数人在见到这道题目的时候，都会选择直接使用正则表达式，不瞒您说，我对正则表达式还没掌握熟练呢。看到这道题的难易程度为**困难**，便觉得不简单，实际上还真是不简单。我收回之前的话，懂得`API`的使用固然很好，但不扎实一点的话就违背我刷题的目的了。

暂时精力还不是太够，等下一轮再继续深入吧。

## 实现

最初的想法很简单：直接使用`JavaScript`的正则表达式。

将传入的参数包装起来，保证模式匹配到开头与结尾，即添加`^`与`$`。

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    return new RegExp('^'+p+'$').test(s);
};
```

## 成绩

Runtime:  **80 ms**

Memory Usage: **34.6 MB**

Status:  **Accepted**

faster than **90.34%** of JavaScript online submissions

less than **86.27%** of JavaScript online submissions