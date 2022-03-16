import { Board } from "./Board.js";
import { getNeighbors, getSolution } from "./BFS.js"
import { writeFile } from "fs";
import { Queue } from "./Queue.js";

// const Board = [
//     [, , , ],
//     [, , , ],
//     [, , , ],
//     [, , , ]
// ]

let puzzle = new Board()

puzzle.getNewBoard()

// console.log(puzzle)
// returns randomized Board
// fillBoard(randomNums(), Board)

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
