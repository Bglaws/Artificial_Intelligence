// let X = [4];
// let Y = [4];
let Board = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

//tis function is a test to see if printBoard is working properly
function fillBoard () {
    let num = 1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            Board[i][j] = num;
            num++;
        }
    }
}

//returns set of numbers between 1 and 15 in random order
function randomNums () {
    let nums = new Set([1])
    // fix this loop!
    while (!nums < 15) {
        let rand = Math.floor(Math.random() * 15) + 1
        nums.add(rand)
        console.log(rand)
    }
    return nums
}

function printBoard () {

    console.log(" ---------- ");
    for (let i = 0; i < 4; i++) {
        console.log("| ")
        for (let j = 0; j < 4; j++) {
            if (Board[i][j] = null) {
                console.log("  | ")
            } else {
                console.log(Board[i][j], " | ")
            }
        }
        X[i] = num++;
    }
    console.log(" ---------- ");
}


console.log(randomNums())


// function printNums () {
//     let nums = randomNums()
//     for (let item of nums) console.log(item)
// }

// printNums()

//console.log(Board)

// fillBoard()

// printBoard()