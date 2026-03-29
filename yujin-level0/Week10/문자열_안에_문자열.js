function solution(str1, str2) {
    for(let i=0; i<= str1.length - str2.length; i++) {
        let contain = true;
        for(let j=0; j<str2.length; j++) {
            if (str1[i+j] !== str2[j]) {
                contain = false;
                break;
            }
        }  
        if (contain) return 1;
    }
    return 2;
}

// 다른 풀이
// function solution(str1, str2) {
//     return str1.includes(str2) ? 1 : 2;
// }
