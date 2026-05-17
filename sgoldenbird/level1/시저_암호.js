function solution(s, n) {
    return s.split('').map(char => {
        if (char===' ') return char;
        
        const isUpperCase = char <= 'Z'; 
        const start = (isUpperCase ? 'A' : 'a').charCodeAt();
        
        return String.fromCharCode((char.charCodeAt() - start + n) % 26 + start);
        
    }).join('');
}