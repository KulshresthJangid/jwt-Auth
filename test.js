const str = "STRING"
let arr = str.split("")
let start = 0
let end = arr.length - 1
console.log(arr.length)



const reverseString = (arr, start, end) => {
    if(start > end) {
        console.log(arr.toString())
        return arr
    }
    let temp = arr[start]
    arr[start] = arr[end]
    arr[end] = temp
    reverseString(arr, start + 1, end - 1)
}
reverseString(arr, start, end)

