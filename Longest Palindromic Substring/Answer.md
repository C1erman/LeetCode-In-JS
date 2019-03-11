# 最长回文子串のLongest Palindromic Substring

## 题目

给定一个字符串 `s`，找到 `s` 中最长的回文子串。你可以假设 `s` 的最大长度为 1000。

Given a string **s**, find the longest palindromic substring in **s**. You may assume that the maximum length of **s** is 1000.

> Example
>
> ```
> Input: "babad"
> Output: "bab"
> Note: "aba" is also a valid answer.
> 
> Input: "cbbd"
> Output: "bb"
> ```

## 思路

子串，又是子串，吸取上次教训的我决定使用**滑动窗口**。

首先实现判断字符串是否为回文字符串的函数：将输入字符串**留下中间字母后**取对半，得到`subStr1`与`subStr2`，使用`String.split('').revers().join('')`将`subStr2`颠倒。并通过`Object.is(subStr1,subStr2)`决定结果。

将给定字符串整体做一次回文判断后~~有些人就是这么恶趣味~~，使用两个指针：`i`和`j`，来指向给定字符串的首与尾。

注意：`String.substring(start,end)`获得的子串实际取值区间为`[start,end)`。

我们现在得到一个长度减一的子串了，那么如何实现**滑动窗口**呢？

用`Set`，当`Set`中不含有指针`i`时，将窗口想后滑动一个单位，可以通过一个变量`len`记录指针`i`与`j`之间的长度。

![图示](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p5-arrow.png)

注意到**滑动窗口**滑到给定字符串的最后时，也就是一轮次的查询结束、指针`j==n`时，需要缩短滑动窗口的长度，并将滑动窗口置于给定字符串的最前端。但这个时候，你需要先做一次额外的判断——否则你会少判断一次，就是在**滑动窗口**滑到最后时，先做一次回文判断，在改变滑动窗口的**长度**和**位置**。

## 实现

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if(is_p(s)) return s;
    let n=s.length,i=0,j=n-1,len=j-i;
    let set=new Set();
    while(i<=j){
        let subStr=s.substring(i,j);
        if(is_p(subStr)){return subStr;}else{
            set.has(i)?null:(set.add(i),i++,j=i+len);
            if(j==n){
                subStr=s.substring(i,j);
                if(is_p(subStr)){return subStr;}
                set.clear();
                i=0;
                len--;
                j=i+len;
            }
        }
    }
}
/*the func is right for any cases except ' ' because NaN!=NaN in js*/
var is_p=(s)=>{
    let n=s.length/2;
    let lower=Math.floor(n),higher=Math.ceil(n);
    let sub1=s.substring(0,lower),sub2=s.substring(higher).split('').reverse().join('');
    return Object.is(sub1,sub2);
}
```

## 成绩

你知道么，由于我的由于我的算法太低级，得到的结果是[Time Limit Exceeded](https://leetcode.com/submissions/detail/213750986/) = =

哭出声。

这也是没办法的事，毕竟从算法的设计思想上来说，它就是一个**贪心算法**，总是从最长的子串开始判定，因此，当给定字符串的长度过长而存在与其中的回文子串又过短时，花费的时间就太长了。

## 改良

