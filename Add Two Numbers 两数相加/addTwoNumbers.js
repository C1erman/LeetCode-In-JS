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
var addTwoNumbers_worst = function(l1, l2) {
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
var addTwoNumbers_best = function(l1, l2) {
    let result=new ListNode(0);
    let p=l1,q=l2,current=result,carry=0;
    while(p!=null||q!=null){
        let a=(p==null)?0:p.val;
        let b=(q==null)?0:q.val;
        let sum=a+b+carry;
        (sum<10)?carry=0:carry=1;
        current.next=new ListNode(sum%10);
        current=current.next;
        (p==null)?null:p=p.next;
        (q==null)?null:q=q.next;
    }
    carry?current.next=new ListNode(1):null;
    return result.next;
};