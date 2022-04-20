export class Node {
    constructor() {
        this.board = [
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ]
        ]
        
        this.moveHistory = []
        // depth will be used for g score
        this.depth = 0
        // priority only required for A*. priority = f score
        this.priority = -1 
        this.hScore = -1
    }

    // nodes with the lowest priority will be placed at the head of the PQ
    setPriority () {
        this.priority = this.depth + this.hScore
    }

    getHScore () {
        let count = 0
        let hScore = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                count++
                // console.log("count is", count, "board index is", this.board[i][j])
                if (this.board[i][j] == 'X') {
                    continue
                }
                else if (this.board[i][j] != count) {
                    hScore++
                }
            }
        }
        this.hScore = hScore
        return this.hScore
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
