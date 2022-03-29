export class Node {
    constructor() {
        this.board = [
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ]
        ]
    }

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
        let rand = 0

        while (nums.size < 15) {
            rand = Math.floor(Math.random() * 15) + 1
            nums.add(rand)
        }
        return nums
    }

    getNewBoard() {
        this.fillBoard(this.randomNums())
    }
}
