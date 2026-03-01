function solution(num_list) {
    let sum = 0;
    let times = 1;
    for(const num of num_list) {
        sum += num;
        times *= num;
    }
    return sum ** 2 > times ? 1 : 0;
}

// 다른 풀이
function solution(num_list) {
    let mul = num_list.reduce((a, c) => {return a*c ;}, 1);
    let sum = num_list.reduce((a, c) => {return a+c ;}, 0);
    return (mul < sum*sum) ? 1 : 0;
}