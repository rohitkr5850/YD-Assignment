/**Problem:-
* Given an array of integers, return the second largest unique number in the array.
* If it doesn’t exist, return -1.

* Why UNIQUE?
* If the largest value appears multiple times, We don't have to count it twice.

 * APPROACH (Optimized):
 * I will maintain two variables:
 *   1) largest  -> stores the largest number found so far
 *   2) secondLargest -> stores the second largest unique number
 *  
 * I will use (for of) loop to iterate over the array.
 * 
 * For every number:
 *   - If the number is > largest:
 *        secondlargest = largest    (previous largest becomes second largest)
 *        largest = number           (update largest)
 *
 *   - Else if number < largest AND number > secondlargest:
 *        secondlargest = number       
 *
 *    Because of this condition:-
      I will avoid duplicates.
 *
 * TIME COMPLEXITY:
 *  O(n) -> We scan array only once.
 *
 * SPACE COMPLEXITY:
 *  O(1) -> Constant extra space,only two variables.
 */

function secondLargestUnique(arr){
//If array is too small , answer can't exist
if(!arr || arr.length < 2) return -1;


//Initialize with smallest possible values
let largest = -Infinity;
let secondLargest = -Infinity;


//Loop through each number in array
for(let num of arr){
    if(num > largest){
        secondLargest = largest;    
        largest = num;              
    }


// It ensures uniqueness   
    else if(num < largest && num > secondLargest){
        secondLargest = num;
    }
}

if(secondLargest === -Infinity) return -1;

return secondLargest;
}


//Sample Tests

console.log(secondLargestUnique([3, 5, 2, 5, 6, 6, 1])); //Output: 5
console.log(secondLargestUnique([7, 7, 7]));             //Output: -1
console.log(secondLargestUnique([1]));                   //Output: -1
console.log(secondLargestUnique([9, 8]));                //Output: 8
console.log(secondLargestUnique([-5, -1, -3, -2]));      //Output: -2