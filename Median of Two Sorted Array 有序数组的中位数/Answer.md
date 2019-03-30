# 寻找两个有序数组的中位数のMedian of Two Sorted Array

## 题目

给定两个大小为 m 和 n 的有序数组 `nums1` 和 `nums2`。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 `nums1` 和 `nums2` 不会同时为空。

There are two sorted arrays **nums1** and **nums2** of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume **nums1** and **nums2** cannot be both empty.

> Example

```
nums1 = [1, 3]
nums2 = [2]
The median is 2.0

nums1 = [1, 2]
nums2 = [3, 4]
The median is (2 + 3)/2 = 2.5
```

## 思路

当我看到这个题目上醒目的红标**困难**时，心里有点犹豫不决。

但`JavaScript`提供的`API`让我像白痴一样完成了这道题。

1. 使用`rest`运算符`...`将两个数组拼接在一起。
2. 使用`Array.sort((a,b)=>a-b)`将数组排序。
3. 剩下的就显而易见了：取数组的中间值返回即可。

emmmmmmmmm

算法的实际实现都让人家封装完了，我在这里~~像白痴一样~~一把梭的很爽。

## 实现

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let res=[...nums1,...nums2].sort((a,b)=>{return a-b;});
    let middle=0,half=(res.length/2)-1;
    half.toString().indexOf('.')<0 ? middle=(res[half]+res[half+1])/2: middle=res[Math.floor(half)+1];
    return middle;
};
```

## 成绩

Runtime:  **120 ms**

Memory Usage:  **38.8 MB**

Status:  **Accepted**

faster than **82.87%** of JavaScript online submissions

less than **84.36%** of JavaScript online submissions

## 改良

就算是我，也知道计算算法的时间复杂度的啊。

上述实现明明是O(n)，而题目要求的是O(log(m + n))。这就超出了我的知识范围了。

同时在审题的时候误以为强制规定输出带有两位小数点，于是稍微查了一下，发现暂时还无法实现以`Number`格式做到，但能够实现以`String`格式输出：

`Number('1').toString().toFixed(1) //1.0`



现在不太想深入研究官方实现，暂且搁置。