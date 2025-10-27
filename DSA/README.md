#  Second Largest **Unique** Number in an Array

##  Problem Statement

Given an array of integers, return the **second largest unique** number.

If it does **not** exist, return `-1`.

###  Why *Unique*?
If the largest value occurs multiple times, we should **not** count it twice.

Example:  
`[6, 6, 5]` → Second largest is `5`, not `6`.

---

##  Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| [3, 5, 2, 5, 6, 6, 1] | 5 | Largest = 6, Second largest unique = 5 |
| [7, 7, 7] | -1 | Only one unique value |
| [1] | -1 | Less than 2 numbers |
| [9, 8] | 8 | Two unique numbers |
| [-5, -1, -3, -2] | -2 | Sorted unique → [-5, -3, -2, -1] |

---

##  Edge Cases

| Case | Result |
|------|--------|
| Array with one element | -1 |
| All values identical | -1 |
| Negative numbers | Supported |
| Duplicates | Ignored properly |

---

##  Approach (Optimized & Interview Friendly)

We keep **two** variables:

| Variable | Purpose |
|----------|----------|
| largest | Tracks current largest |
| secondLargest | Tracks second largest unique |

Loop through the array:

### Update Conditions:
1. **If `num > largest`:**
   - Old `largest` becomes `secondLargest`
   - `num` becomes new `largest`

2. **Else if `num < largest && num > secondLargest`:**
   - `num` becomes new `secondLargest`  
   *(avoids duplicates automatically)*

---

## Time & Space Complexity

| Complexity | Value | Reason |
|------------|--------|---------|
| Time | **O(n)** | Single scan |
| Space | **O(1)** | Only two variables |

---

