function solution(arr1, arr2) {
    const length1 = arr1.length;
    const length2 = arr2.length; 
    const sum1 = arr1.reduce((acc, cur) => { return acc + cur; }, 0);
    const sum2 = arr2.reduce((acc, cur) => { return acc + cur; }, 0);
    
    if (length1 !== length2){
        return length1 > length2 ? 1 : -1;
    }
    
    if (sum1 !== sum2){
        return sum1 > sum2 ? 1 : -1;
    }
   
    return 0; 
}