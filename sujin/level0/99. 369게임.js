function solution(order) {
    return String(order).split("").filter((item)=> item === "3" | item === "6" | item === "9").join("").length
    
}