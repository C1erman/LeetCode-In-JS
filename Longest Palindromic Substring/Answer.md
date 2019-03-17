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

哭出声，哇。

这也是没办法的事，毕竟从算法的设计思想上来说，它就是一个**贪心算法**，总是从最长的子串开始判定，因此，当给定字符串的长度过长而存在与其中的回文子串又过短时，花费的时间就太长了。

## 改良

### 中心扩展算法

观察一个回文字符串，可以发现它总是由一个中心扩展开来的。

如果这个字符串的长度是奇数，中心就为中间的字母；如果为偶数，中心就为中间字母的中间。

那么对于一个给定的字符串来说，在它的长度为`n`的前提下，**潜在**的中心有几个呢？

**2n-1**，因为我们暂时还不知道这个字符串的长度，因此每一个字符（n）、每两个字符中间（2n-1）都有可能是回文字符串的中心。

因此，我们可以在一个循环里，每次判断两次，分别对应奇数长度、偶数长度。

我们如何判断呢？

可以通过一个函数，它接收传过来的参数`left`、`right`，以`left`、`right`为中心（当`left=right`时做奇数长度判断）向两侧扩展，做最长回文字符串判断，并返回回文字符串的**长度**。

如何从返回的长度来计算出来最长的回文子串呢？

通过两个标识符`start`、`end`，每次循环时我们总是假设当前的`i`为中心，每次做完两次判断后取最大的值，因为我们不知道取得的回文字符串长度的奇偶性，因此取`start=Math.round(i-(len-1)/2),end=i+len/2`。

注意这个`Math.round()`!因为在`JavaScript`中`String.substring(1.5)-->String.substring(1)`。

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if(s==null||s.length<1) return '';
    let start=0,end=0;
    for(let i=0;i<s.length;i++){
        let len_odd= aroundStr(s,i,i);
        let len_even= aroundStr(s,i,i+1);
        let len=Math.max(len_odd,len_even);
        (len>end-start)?(start=Math.round(i-(len-1)/2),end=i+len/2):null;
    }
    return s.substring(start,end+1);
}
var aroundStr=(s,start,end)=>{
    let l=start,r=end;
    while(l>=0&&r<s.length&&s.charAt(l)==s.charAt(r)){
        l--;
        r++;
    }
    return r-l-1;
}
```