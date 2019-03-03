# 两数之和のTwo Sum

## 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution, and you may not use the *same* element twice.

> Example
>
> ```
> Given nums = [2, 7, 11, 15], target = 9,
> Because nums[0] + nums[1] = 2 + 7 = 9,
> return [0, 1].
> ```

## 思路

通过双重循环遍历数组，求出每两个元素之和，并与`target`进行比较，返回以这两个下标为内容的**数组**。

> 你不能重复利用这个数组中同样的元素。

通过双重循环，便可以消除上述问题。

时间复杂度为O(n^2)

空间复杂度为O(1)

对于每个元素，试图通过遍历数组的其部分来寻找它。

## 实现

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum=(nums,target)=>{
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]==target){
                return new Array(i,j);
            }
        }
    }
}
```

## 成绩

Runtime:  **112 ms**

Memory Usage:  **34.8 MB**

Status:  **Accepted**

## 改良

很显然，我使用的是**暴力法**，毫无数学修养。

### 使用两遍Hash表

`JavaScript`中并没有`Hash`表的实现，注意到一点：在`JavaScript`中，`Object`的属性是基于`Hash`表的实现。

那么，我们为什么要用`Hash`表呢？

`Hash`支持以**近似**恒定的时间进行快速查找，因为它是保证数组的每个元素与其索引相互对应的最好方法。想想我们

需要了解的知识点：

1. `in`运算符可以用来测试一个属性是否存在，相当于`Java`中`Hash`的`HahsMap.containsKey()`。
2. `delete`运算符用来删除一个对象的属性，使用`delete`删除的属性，`for/in`将不会枚举该属性，并且`in`运算符也不会检测到该属性。
3. 通常使用`for/in`来枚举对象的属性。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let hash=new Object();
    for(let i=0;i<nums.length;i++){
        hash[nums[i]]=i;
    }
    for(let i=0;i<nums.length;i++){
        let lefts=target-nums[i];
        if((lefts in hash)&&hash[lefts]!=i){
            return new Array(i,hash[lefts]);
        }
    }
};
```

时间复杂度为O(n)

空间复杂度为O(n)

Runtime:  **60 ms**

Memory Usage:  **36.2 MB**

Status:  **Accepted**

### 使用一遍Hash表

实际上，我们在可以在迭代赋值的同时进行元素的查找。这样还顺便解决了“查找的不应该是自身”的问题——总是在已有元素中查找。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let hash=new Object();
    for(let i=0;i<nums.length;i++){
        let lefts=target-nums[i];
        if(lefts in hash){
            return new Array(i,hash[lefts]);
        }
        hash[nums[i]]=i;
    }
};
```
时间复杂度为O(n)

空间复杂度O为(n)

Runtime:  **60 ms**

Memory Usage:  **35.6 MB**

Status:  **Accepted**