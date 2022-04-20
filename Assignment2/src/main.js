import { Node } from "./Node.js";
import { BFSSolution } from "./BFS.js"
import { DFSSolution } from "./DFS.js";
import { DFSHandler } from "./DFSRecursive.js"
import { aStarSolution } from "./AStar.js";
const args = process.argv

// This node has a randomized board. It takes too long to solve and will not be used.
// I have run this program many times and it always end with a heap overflow.
let puzzle = new Node()
puzzle.getNewBoard()

let BFSPuzzle = new Node()
BFSPuzzle.board = [
    [2,3,7,'X'],
    [1,10,8,4],
    [5,11,6,12],
    [9,13,14,15]
]

let DFSPuzzle = new Node()
DFSPuzzle.board = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,'X',14,15]
]

switch(args[2]) {
    
    case 'bfs':
        BFSSolution(BFSPuzzle)
        break

    case 'dfs':
        // DFSSolution(DFSPuzzle)
        DFSHandler(DFSPuzzle)
        break

    case 'ids':
        // IDSSolution(puzzle)
        break

    case 'a*':
        aStarSolution(BFSPuzzle)
        break

    default:
        console.log("invalid argument")
}

