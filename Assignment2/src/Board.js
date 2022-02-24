let Board = [
    [, , , ],
    [, , , ],
    [, , , ],
    [, , , ]
]
//FILL BOARD IS NOT WORKING PROPERLY
//this function is a test to see if printBoard is working properly
function fillBoard (nums) {
    //convert set to array to iterate through it
    const arr = Array.from(nums)
    let index = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            Board[i][j] = arr[index++];
        }
    }
}

//returns set of numbers between 1 and 15 in random order
function randomNums () {
    let nums = new Set([])
    let count = 0

    // THIS WORKS BUT IS INEFFICIENT
    while (nums.size < 15) {
        let rand = Math.floor(Math.random() * 15) + 1
        nums.add(rand)
        console.log(count++)
    }
    return nums
}

// This function is a more efficient version of randomNums. Come back to this if everything else is working.
function recursiveRandomNums (nums, rand) {
    if (nums.size >= 15) {
        return
    }
    if (nums.has(rand)) {
        return 
    }
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


fillBoard(randomNums)

console.log(Board)

// console.log(randomNums())
