function solution(arr, n) {
    const array = [...arr]
    
    for(let i = 0; i < array.length; i++){
        if(array.length % 2 !== 0){
            if(i % 2 === 0){
                array[i] += n;
            }
        } else {
            if(i % 2 !== 0){
                array[i] += n;
            }
        }
    }
    
    return array;
}