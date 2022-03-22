
export class Board {
    constructor() {
        this.board = [
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ]
        ]
    }
    
    // constructor(arr) {
    //     this.board = this.randomBoard(arr)
    // }

    // randomBoard() {
    //     let currentIndex = array.length,  randomIndex;

    //     // While there remain elements to shuffle...
    //     while (currentIndex != 0) {

    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex--;

    //         // And swap it with the current element.
    //         [array[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    //         }

    //     return array;
    // }

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
