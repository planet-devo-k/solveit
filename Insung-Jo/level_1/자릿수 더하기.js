function solution(n)
{
    const array = String(n).split("");
    let sum = 0;
    
    for(const i of array) {
        sum += +i;
    }
    return sum;
}