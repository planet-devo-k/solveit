function solution(my_string, index_list) {
    let result = "";
    for(let i = 0; i < index_list.length; i++) {
        a = index_list[i]
        result += my_string[a];
    }
    return result;
}

// 다른 풀이
function solution(my_string, index_list) {
    return index_list.map(i => my_string[i]).join('')
}