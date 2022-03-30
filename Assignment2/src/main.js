import { Node } from "./Node.js";
import { BFSSolution } from "./BFS.js"
import { writeFile } from "fs";
import { Queue } from "./Queue.js";
import { DFSSolution } from "./DFS.js";

let puzzle = new Node()
puzzle.getNewBoard()

// BFS solution
// BFSSolution(puzzle)

// DFS is much simpler, since it is less efficient
let DFSPuzzle = new Node()
DFSPuzzle.board = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,'X',15]
]

// DFS solution
DFSSolution(DFSPuzzle)
