function solution(a, b) {
    atob = String(a) + String(b)
    atimesb = 2*a*b
    return atob >= atimesb ? Number(atob) : Number(atimesb);
}