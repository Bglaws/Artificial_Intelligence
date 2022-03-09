import { randomNums, fillBoard, printBoard } from "./Board.js";
import { getNode } from "./BFS.js"
import { writeFile } from "fs";


let Board = [
    [, , , ],
    [, , , ],
    [, , , ],
    [, , , ]
]

let data = 'Does this even work?'

// returns randomized Board
fillBoard(randomNums(), Board)

getNode(Board)



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
