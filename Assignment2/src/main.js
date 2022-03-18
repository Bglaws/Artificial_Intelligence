import { Board } from "./Board.js";
import { getSolution } from "./BFS.js"
import { writeFile } from "fs";
import { Queue } from "./Queue.js";

// const Board = [
//     [, , , ],
//     [, , , ],
//     [, , , ],
//     [, , , ]
// ]

let test2 = new Board
test2.board = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 'X', 15]
]

console.log(test2)

let test = new Board()
test.fillBoard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

let puzzle = new Board()
puzzle.getNewBoard()

// console.log(puzzle)
// returns randomized Board
// fillBoard(randomNums(), Board)

// BFS SOLUTION 
// getSolution(puzzle)

// BFS TEST
getSolution(puzzle)



// write BFS result to file
// writeFile('output.txt', Board.toString(), (err) => {
//     if (err) throw err
// })

// write DFS result to file
// writeFile('output.txt', Board.toString(), (err) => {
//     if (err) throw err
// })

// write other result to file 
// writeFile('output.txt', Board.toString(), (err) => {
//     if (err) throw err
// })

//printBoard(Board)
//console.log(Board)
