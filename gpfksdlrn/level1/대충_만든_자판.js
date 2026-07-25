// https://school.programmers.co.kr/learn/courses/30/lessons/160586

// 문자별 최소 입력 횟수를 Map으로 생성
const createKeyMap = (keymap) => {
    const map = new Map();
    for (const key of keymap) {
        [...key].forEach((char, idx) => {
            if (!map.has(char) || map.get(char) > idx + 1) 
                map.set(char, idx + 1);
        });
    }
    return map;
}

// 하나의 target 문자열에 필요한 최소 입력 횟수를 계산
const countPress = (target, map) => {
        let sum = 0;
        for (const ch of target) {
            if (!map.has(ch)) return -1;
            sum += map.get(ch);
        }
        return sum;
}

// 각 target 문자열의 최소 입력 횟수를 반환
const solution = (keymap, targets) => {
    const map = createKeyMap(keymap);
    return targets.map((target) => countPress(target, map));
}