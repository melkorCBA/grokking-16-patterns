/**
 * @param {number} n
 * @return {boolean}
 */



/*
2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 = > 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4
                                               ^
                                                                                                ^
                                                                                                
hasve two pointers
slow move by 1
fast move by 2

complexcity - T O(n), S - O(1), n=number of items in the loop


here better approuch would be not using slow and fast pointer,
but using a hash set,

why ?
the squre sum calculation is expensive
thre will be repeated claculation for slow ponter number, that is alreday calculated by fast pointer

for this we can use dynamic programming (hashmap)

so need extra space anyway

***so might as well use hash set solution


*/
const calculateDigitsSqrSum = (n) => {
    
    // complexcity - T - O(m), S-O(1), m=number of digits
    // 189
    let sum=0;
    while(n>0){
        sum+=Math.pow(n%10,2); // +9^2, +8^2, +1^2
        n=Math.floor(n/10); // =18, =1, =0
    }
    return sum;
    
}

var isHappy = function(n) {
    let slow=n;
    let fast=n;
    // dynamic programming
    const calculatedValues = new Map();
    const getDigitsSqrSum = (num) => {
        let sum = calculatedValues.get(num);
        if(sum && sum!==0){
            return sum;
        }
       sum = calculateDigitsSqrSum(num);
        calculatedValues.set(num,sum);
        return sum;
        
        
    }
    
    while(fast!==1 && getDigitsSqrSum(fast)!==1){
        slow=getDigitsSqrSum(slow);
        fast=getDigitsSqrSum(getDigitsSqrSum(fast));
        if(slow===fast){
            return false;
        }
    }
    
    return true;
};