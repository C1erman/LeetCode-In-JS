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

通过两个标识符`start`、`end`，每次循环时我们总是假设当前的`i`为中心，每次做完两次判断（奇、偶）后取最大的返回值，因为我们不知道取得的回文字符串长度的奇偶性，因此取`start=Math.round(i-(len-1)/2),end=i+len/2`。

注意这个`Math.round()`!因为在`JavaScript`中`String.substring(1.5)-->String.substring(1)`。但是由于我们已经将`len-1`：如果回文子串的长度为偶数，那么中心左边的长度会比右边少一位。因此为了避免出现`0.5=1`，即多取一位的情况，我们使用了`Math.round()`这个四舍五入的函数。

![Math.round()](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p5-another-arrow.png)

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

Runtime:  **92 ms**

Memory Usage:  **36.2 MB**

Status:  **Accepted**

faster than **87.69%** of JavaScript online submissions

less than **74.14%** of JavaScript online submissions

### Manacher算法

又叫马拉车 = =

是查找最长回文子串的**线性方法**，好厉害！

#### 变身

考虑输入字符串长度的奇偶性干嘛呀，想一想计算偶数回文字符串时的下标计算是多么的让人难受，于是，为何不在每个字符的周围添上一个罕见的字符，使它变成奇数长度呢？

比如这样：`#a#b#b#`

这样，长度就变成`(n-1+2)+n=2n+1`的奇数长度了。

#### 一个特性

现在我们来考虑一个重要的**数组**——与处理后的字符串长度相同、每一位存放着对应字符的**扩展半径**。

对于上述字符串`#a#b#b#`，对应的数组为`0101210`。

为什么这个数组比较重要呢？

以`a`举例，它在原字符串中的位置是`0`，在新字符串中的位置是`1`，它的扩展半径为`1`。

好了，我们现在掌握的信息是一个字符`x`在新字符串的下标`index_new`，以它为中心所扩展的回文串长度`len`，我们怎么求出`x`在原字符串的**起始下标**（回文子串的起始位置）`index_old`呢？

这就是马拉车中的一个特性了：`index_old=(index_new-len)/2`。

其实，呃。

因为`#`存在的缘故，因此我们要除以2。

![特性](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p5-last-arrow.png)

#### 实现

马拉车算法的精髓在于以**线性时间**计算出这个数组。

就像[KMP算法](https://blog.csdn.net/Clerman/article/details/72373335)一样，它充分利用了我们之前计算出的结果，并且由于回文子串的**镜像特性**，我们可以将计算数组的方式简化。

暂时无法透彻的理解这个算法，属于半懂不懂的程度，等下一轮再看看。

[他山之石](http://www.cnblogs.com/grandyang/p/4475985.html)。

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // 首先插入一个#
    let newstr = fillWithSharp(s);
    // 以newStr每个字符串为中心的回文串的长度数组，最小为1
    let len = [];
    // 最长的回文串的右端点
    let longestPalindromeRight = 0;
    // 最长的回文串的中心点
    let longestPalindromeCenter = 0;
    // 记录最长回文长度
    let longestPalindrome = 0;
    //计算数组
    for(let i=0;i<newstr.length;i++) {
        let needExpand = true;
        let spandStart = i+1;
        // 在右边界内的时候寻找对称点
        if(i<longestPalindromeRight) {
            // 找关于中心的对称点j
            const j = 2*longestPalindromeCenter - i;
            // 如果这时候还在右边界内，则不需要扩展
            if(longestPalindromeRight >= i + len[j] ) {
                len[i] = len[j];
                needExpand = false
            } else {
                spandStart = longestPalindromeRight + 1
            }
        }
        // 这里是拓展的代码
        if(needExpand) {
            // 这里雷同上面的single拓展
            while(spandStart<newstr.length && 2*i-spandStart>=0) {
                if(newstr[spandStart] === newstr[2*i-spandStart]) {
                    spandStart++
                } else {
                    break
                }
            }
        }
        len[i] = spandStart - i;
        if(len[i]>longestPalindrome) {
            longestPalindromeRight = spandStart - 1;
            longestPalindrome = len[i];
            longestPalindromeCenter = i;
        }
    }
    // 找到len中的最大值索引
    const originRight = longestPalindromeRight / 2;
    const originLongestPalindrome = longestPalindrome - 1;
    return s.substr(originRight-originLongestPalindrome,originLongestPalindrome)
};
var fillWithSharp=(s)=>{
    return String.prototype.concat('#',s.split('').join('#'),'#');
}
```

Runtime:  **68 ms**

Memory Usage:  **37.3 MB**

Status:  **Accepted**

faster than **99.16%** of JavaScript online submissions

less than **57.76%** of JavaScript online submissions