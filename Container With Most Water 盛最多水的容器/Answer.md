# 盛最多水的容器のContainer With Most Water

## 题目

给定 *n* 个非负整数 *a*1，*a*2，...，*a*n，每个数代表坐标中的一个点 (*i*, *ai*) 。在坐标内画 *n* 条垂直线，垂直线 *i* 的两个端点分别为 (*i*, *ai*) 和 (*i*, 0)。找出其中的两条线，使得它们与 *x* 轴共同构成的容器可以容纳最多的水。

**说明：**你不能倾斜容器，且 *n* 的值至少为 2。

Given *n* non-negative integers *a1*, *a2*, ..., *an* , where each represents a point at coordinate (*i*, *ai*). *n* vertical lines are drawn such that the two endpoints of line *i* is at (*i*, *ai*) and (*i*, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

**Note:** You may not slant the container and *n* is at least 2.

> Example

```javascript
Input: [1,8,6,2,5,4,8,3,7]
Output: 49
```

## 思路

什么，暴力法？不不不，都9102年了谁还想用暴力法来解题。

这道题的关键是，影响矩形面积的关键因素。

对长和宽来说，**最小的那个值对矩形的面积影响最大**。就像这样：

![影响矩形面积的最大因素](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p11-about-rect.png)

那么，只要我们尽可能的将短的线段换成长的线段，就能保证矩形面积向着最大改变。

可能有人不理解，因为在潜意识中，我们认为矩形的面积是长、宽两因素的作用结果，而我们得到的一般规律是针对一个因素改变下的情况。因此，我们需要做的就是将两因素控制为一因素。

于是，我们就可以这么做：

用两个指针，指向给定数组的开头与末尾，即指向两条线段，计算当前的矩形面积。

当左指针小于右指针时：

- 如果左指针指向的线段长度小于右指针指向的线段长度，那么左指针向右移动一个单位
- 反之，右指针向左移动一个单位

就像这样：

![解题过程](https://raw.githubusercontent.com/C1erman/Graph-bed/master/imgs/For%20LeetCode/p11-caculate.png)

最开始的时候，我们保证了矩形的宽——也就是左、右指针之间的长度差，有最大值。试想，按照我们之间所寻找到的规律，此时矩形的长——左、右指针指向的线段中的最短那根，是影响矩形面积的关键，因为矩形的宽无法继续增加，因此符合单因素条件。

每次减小宽的一个单位，均换取到了单因素情况下矩形面积的最大影响——使矩形的长发生改变。

显然，我们朝着最大矩形面积这条路上走去。

## 实现

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0, l = 0, r = height.length -1;
    while(l<r){
        max = Math.max(max, Math.min(height[l], height[r])*(r -l));
        height[l] < height[r] ? l++:r--;
    }
    return max;
};
```

## 成绩

Runtime:  **76 ms**

Memory Usage: **35.6 MB**

Status:  **Accepted**

faster than **61.31%** of JavaScript online submissions

less than **39.58%** of JavaScript online submissions

## 改良

总感觉循环的最后几次是多余的——矩形长的增量已经无法弥补矩形宽的缺失，但对这个边界值的判断暂时还无法准确的掌握，姑且放到下一轮再看吧。

就跟不甘心。