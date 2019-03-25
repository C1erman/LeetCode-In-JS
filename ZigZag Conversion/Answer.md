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

- 重复性：`Z`字形变换后的结果是由很多个`V`形部分组成的

- 对称性：`Z`字形变换的每一个`V`形部分都是对称的

那么，抽象出的算法就很明确了：使用一个长度为`numRows`的数组来存放经过Z字形变换后每一行的字符串。在每次循环时，将对应的字符串拼接到数组的对应位置。循环结束后，再处理剩余的字符串。

在最后，返回数组元素形成的字符串即可。

就像下图这样：

![示例](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p6-idea.png)

~~我想画画，不，你不想.jpg~~

## 实现

```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows==1) return s;
    let len=s.length;
    let repeat=Math.floor(len/(2*(numRows-1)));
    let other=len%(2*(numRows-1));
    let ans=new Array(numRows);
    let to_use=2*(numRows-1);
    ans.fill('');
    /*填充可重复部分*/
    for(let i=0;i<repeat;i++){
        for(let j=0;j<numRows;j++){
            ans[j]+=s[i*to_use+j];
            if(j!=0&&j!=numRows-1){
                ans[j]+=s[i*to_use+to_use-j];
            }
        }
    }
    /*填充不可重复部分*/
    if(other>numRows){
        ans.forEach((value,index,arr)=>{
            s[len-other+index]?arr[index]+=s[len-other+index]:null;
        });
        let ov=s.substring(len-other+numRows);
        /*ov是超出numRows的部分*/
        for(let i=0;i<ov.length;i++){
            ans[numRows-(i+1)%numRows-1]+=ov[i];
        }
    }else{
        ans.forEach((value,index,arr)=>{
            s[len-other+index]?arr[index]+=s[len-other+index]:null;
        });
    }
    return ans.join('')
};
```

## 成绩

Runtime:  **104 ms**

Memory Usage:  **38.7 MB**

Status:  **Accepted**

faster than **76.73%** of JavaScript online submissions

less than **64.62%** of JavaScript online submissions

## 改良

值得注意的是，上述操作是建立在操作String比操作`Array`的内存消耗大的自我认知上，即：

1. 执行`'a'+'b'`的内存消耗
2. 执行`[a].push[b]`的内存消耗

假设`2`比`1`大，才会有用数组的每一项中存放字符串。