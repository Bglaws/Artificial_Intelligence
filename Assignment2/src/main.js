import { Node } from "./Node.js";
import { BFSSolution } from "./BFS.js"
import { writeFile } from "fs";
import { Queue } from "./Queue.js";
import { DFSSolution } from "./DFS.js";

const args = process.argv
let puzzle = new Node()

switch(args[2]) {
    
    case 'bfs':
        puzzle.getNewBoard()
        BFSSolution(puzzle)
        break
    case 'dfs':
        // puzzle.getNewBoard()
        // DFS takes too long to solve with random puzzle
        puzzle.board = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,'X',15]
        ]
        DFSSolution(puzzle)
    case 'ids':
        // IDSSolution(puzzle)
    case 'a*':
        aStarSolution
    default:
        console.log("invalid argument")
}



// BFS solution
// BFSSolution(puzzle)

// DFS is much simpler, since it is less efficient
// let DFSPuzzle = new Node()
// DFSPuzzle.board = [
//     [1,2,3,4],
//     [5,6,7,8],
//     [9,10,11,12],
//     [13,14,'X',15]
// ]

// // DFS solution
// DFSSolution(DFSPuzzle)
