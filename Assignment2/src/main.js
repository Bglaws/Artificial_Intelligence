import { Node } from "./Node.js";
import { BFSSolution } from "./BFS.js"
import { writeFile } from "fs";
import { Queue } from "./Queue.js";
import { DFSSolution } from "./DFS.js";

// let test2 = new Board
// test2.board = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 'X', 15]
// ]

// let test = new Board()
// test.fillBoard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

let puzzle = new Node()
puzzle.getNewBoard()

// BFS solution
BFSSolution(puzzle)

// DFS solution
// DFSSolution(puzzle)



// write BFS result to file
// writeFile('output.txt', JSON.stringify(puzzle.board), (err) => {
//     if (err) throw err
// })
// appendFile('output.txt', getSolution(puzzle), (err) => {
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

