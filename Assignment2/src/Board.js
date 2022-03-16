
export class Board {
    constructor() {
        this.board = [
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ]
        ]
    }

    //this function is a test to see if printBoard is working properly
    fillBoard (nums) {
        //convert set to array to iterate through it
        const arr = Array.from(nums)
        let index = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.board[i][j] = arr[index++];
            }
        }
        this.board[3][3] = 'X'
    }

    //returns set of numbers between 1 and 15 in random order
    randomNums () {
        let nums = new Set([])
        let count = 0

        // THIS WORKS BUT IS INEFFICIENT
        while (nums.size < 15) {
            let rand = Math.floor(Math.random() * 15) + 1
            nums.add(rand)
            // console.log(count++)
        }
        return nums
    }

    getNewBoard() {
        this.fillBoard(this.randomNums())
    }
}



//this function is a test to see if printBoard is working properly
// export function fillBoard (nums) {
//     //convert set to array to iterate through it
//     const arr = Array.from(nums)
//     let index = 0
//     let board = new Board()
//     for (let i = 0; i < 4; i++) {
//         for (let j = 0; j < 4; j++) {
//             board[i][j] = arr[index++];
//         }
//     }
//     board[3][3] = 'X'
// }

//returns set of numbers between 1 and 15 in random order
// export function randomNums () {
//     let nums = new Set([])
//     let count = 0

//     // THIS WORKS BUT IS INEFFICIENT
//     while (nums.size < 15) {
//         let rand = Math.floor(Math.random() * 15) + 1
//         nums.add(rand)
//         // console.log(count++)
//     }
//     return nums
// }

// This function is a more efficient version of randomNums. Come back to this if everything else is working.
// function recursiveRandomNums (nums, rand) {
//     if (nums.size >= 15) {
//         return
//     }
//     if (nums.has(rand)) {
//         return 
//     }
// }

export function printBoard (Board) {

    console.log(" ---------- ");
    for (let i = 0; i < 4; i++) {
        console.log("| ")
        for (let j = 0; j < 4; j++) {
            if (Board[i][j] = null) {
                console.log("  | ")
            } else {
                console.log(Board[i][j], " | ")
            }
            console.log(" ---------- ")
        }
    }
    console.log(" ---------- ");
}

// console.log(randomNums())
