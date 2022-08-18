/*
// Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy 
the condition nums[i] + nums[j] + nums[k] < target.

// For example, given nums = [-2, 0, 1, 3], and target = 2.

// Return 2. Because there are two triplets which sums are less than 2:

// [-2, 0, 1]
// [-2, 0, 3]
// Follow up:
// Could you solve it in O(n2) runtime?

*/

/*
[-2, 0, 1, 3]
sort - T-O(nlogn)
  [-2, 0, 1, 3, 4]
i=  ^
       ^     ^


if we found a 3 sums solution we can how much right pointer moves to left we will get even lesser value
so when solution is found trplets count increses is  right-left
then we can try raise the sum a bit by increasing the left pointer 

complexcities:
T- O(nlogn + n^2)~O(n^2)
S- O(1)

*/

const threeSumSmaller = (nums, target) => {
  nums = nums.sort((el1, el2) => el1 - el2);
  let triplets = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    let left=i+1;
    let right=nums.length-1;

    while(left<right) {
      const sum = nums[i]+nums[left]+nums[right];

      if(sum>=target){
        right--;
        continue;
      }

      triplets+=right-left;
      left++;
    }

  }
  return triplets;
};


