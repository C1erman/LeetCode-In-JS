# 两数相加のAdd Two Numbers

## 题目

给出两个**非空**的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

> Example
>
> ```
> Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
> Output: 7 -> 0 -> 8
> Explanation: 342 + 465 = 807.
> ```

## 思路

题外话：今天看到一个比较感兴趣的观点，就是将`function`当作对象工厂，使用箭头函数来实现函数。

给出定义：**结果链表**の`result`、**链表节点**の`listNode`、**输入链表**の`l1`与`l2`。

注意链表的结构性，自然想到将两个链表的对应的每一位数字相加，判断是否有进位，并因此`new`一个`listNode`，用于存放每次相加的**个位**运算结果，并链接到<u>结果链表</u>。

那么两两相加到什么时候呢？显然是<u>输入链表</u>**一个或双方**的`next`为`null`的时候，相加结束后，可不要忘了进位的存在。但是，为了方便进行`next`的赋值操作，我们应该首先判断是哪一个<u>输入链表</u>走到了尽头。

判断之后，依据进位是否存在，进行如下操作：

- 有进位，则与**未到尽头的链表**的每一位进行相加，同样`new`一个链表节点，与<u>结果链表</u>进行链接。但是需要注意的是，相加过程中会出现：**有进位，但是链表已走到尽头**这种情况。对于这种情况，在<u>结果链表</u>的最后添加一个值为1的<u>链表节点</u>即可。
- 无进位，直接进行链表的链接。

## 实现

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carry=0,result=0,list=new ListNode(0);
    let that=list;
    while(l1&&l2){
        result+=(l1.val+l2.val+carry);
        result<10?carry=0:carry=1;
        list.val=(result%10);
        l1.next&&l2.next?(list.next=new ListNode(),list=list.next):list.next=null;
        l1=l1.next;
        l2=l2.next;
        result=0;
    }
    if(l1||l2){
        if(l1){
            if(carry){
                while(carry&&l1){
                    result+=(l1.val+carry);
                    result<10?carry=0:carry=1;
                    list.next=new ListNode(result%10);
                    list=list.next;
                    l1=l1.next;
                    result=0;
                }
                if(carry){
                    list.next=new ListNode(1);
                    return that;
                }
            }
        list.next=l1;
        }else{
            if(carry){
                while(carry&&l2){
                    result+=(l2.val+carry);
                    result<10?carry=0:carry=1;
                    list.next=new ListNode(result%10);
                    list=list.next;
                    l2=l2.next;
                    result=0;
                }
                if(carry){
                    list.next=new ListNode(1);
                    return that;
                }
            }
            list.next=l2;
        }
    }else{
        carry?list.next=new ListNode(1):list.next=null;
    }
    return that;
};
```

## 成绩

Runtime:  **128 ms**

Memory Usage:  **38.4 MB**

Status:  **Accepted**

