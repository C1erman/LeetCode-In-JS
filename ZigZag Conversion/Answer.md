# Z字形变换のZigZag Conversion

## 题目

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"LEETCODEISHIRING"` 行数为 3 时，排列如下：

```
L   C   I   R
E T O E S I I G
E   D   H   N
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"LCIRETOESIIGEDHN"`。

The string `"PAYPALISHIRING"` is written in a zigzag  pattern on a given number of rows like this: (you may want to display  this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

> Example

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

## 思路

我发现一个问题  = =

好像每次我都是从最笨拙的方法开始尝试的，不过！我现在渐渐开始尝试从实际生活中抽象出对应的算法问题了了了了。

在纸上画出`numRows`等于3、4、5的情况。

发现有如下规律：

## 实现

## 成绩