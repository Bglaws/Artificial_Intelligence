import { Queue } from "./Queue.js";
import {Board} from "./Board.js"

// Solution to the puzzle
let solution = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 'X']
]
// Total number of moves performed to find solution
let numberOfMoves = 0

// Queue for keeping track of order of the nodes
let queue = new Queue()

// Need to use a hashset in conjunction with queue. 
// This is to ensure no duplicate nodes are added to the queue
let set = new Set()

// current address of empty tile
let currentAddress = []

// for array comparisons
const equals = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

/**Hang on to this function. for now it is not needed,
 * but if randomNums is updated this function will be necessary.
 * Currently, empty tile is always in the bottom right corner. * 
 */
function getEmptyTile (currentNode) {

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(currentNode[i][j] === 'X') {
                // save the address of the empty tile
                currentAddress = [i, j]
            }
        }
    }
}

/**getMove returns all possible moves from a given position
 * i.e. 'N' 'S' 'E' 'W'
 * 
 * I forgot that, with the way I set up randomNums, 
 * the undefined position will always be in the bottom left corner of the board
 * for now I will keep it this way.
 */
export function getPossibleMoves () {
    let address = currentAddress

    // corners
    // top left
    if (equals(address, [0,0])) return ['N', 'W']
    // top right
    else if (equals(address, [0,3])) return ['N', 'E']
    // bottom left
    else if (equals(address, [3,0])) return ['S', 'W']
    // bottom right
    else if (equals(address, [3,3])) return ['S', 'E']

    // sides
    // top
    else if (equals(address, [0,1]) && equals(address, [0,2])) return ['N', 'E', 'W']
    // bottom
    else if (equals(address, [3,1]) && equals(address, [3,2])) return ['S', 'E', 'W']
    // left side
    else if (equals(address, [1,0]) && equals(address, [2,0])) return ['N', 'S', 'W']
    // right side 
    else if (equals(address, [1,3]) && equals(address, [2,3])) return ['N', 'S', 'E']

    // inner circle
    // upper left
    else if (equals(address, [1,1])) return ['N','S','E','W']
    // upper right
    else if (equals(address, [1,2])) return ['N','S','E','W']
    // bottom left
    else if (equals(address, [2,1])) return ['N','S','E','W']
    // bottom right
    else if (equals(address, [2,2])) return ['N','S','E','W']

    else return -1
}


/** getNode performs the provided move, and adds the new node to the queue.
 */
function getNode(currentNode, move, x, y) {
    let newNode = new Board()
    newNode.board = JSON.parse(JSON.stringify(currentNode))

    // console.log("newNode looks like ", newNode)
    
    switch (move) {
        case 'N':
            newNode.board[y][x] = currentNode[y+1][x]
            newNode.board[y+1][x] = 'X'
            if (set.has(newNode.board)) {
                break
            }
            else {
                queue.enqueue(newNode.board)
                set.add(newNode.board)
                numberOfMoves++
                console.log('N', "total number of moves: ", numberOfMoves)
                
            }
            // console.log("the board after N move", newNode)
            break

        case 'S':
            newNode.board[y][x] = currentNode[y-1][x]
            newNode.board[y-1][x] = 'X'
            if (set.has(newNode.board)) {
                break
            }
            else {
                queue.enqueue(newNode.board)
                set.add(newNode.board)
                numberOfMoves++
                console.log('S', "total number of moves: ", numberOfMoves)
            }
            // console.log("the board after S move", newNode)
            break

        case 'E':
            newNode.board[y][x] = currentNode[y][x-1]
            newNode.board[y][x-1] = 'X'
            if (set.has(newNode.board)) {
                break
            } 
            else {
                queue.enqueue(newNode.board)
                set.add(newNode.board)
                numberOfMoves++
                console.log('E', "total number of moves: ", numberOfMoves)
            }
            // console.log("the board after E move", newNode)
            break
        
        case 'W': 
            newNode.board[y][x] = currentNode[y][x+1]
            newNode.board[y][x+1] = 'X'
            if (set.has(newNode.board)) {
                break
            } 
            else {
                queue.enqueue(newNode.board)
                set.add(newNode.board)
                numberOfMoves++
                console.log('W', "total number of moves: ", numberOfMoves)
            }
            // console.log("the board after W move", newNode)
            break

        default:
            console.log("Something went wrong in 'move' function.")
    }
}

/**getNode recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move.
 * The idea is to queue all neighboring nodes of the starting node
 */
 export function queueNeighbors (currentNode) {
    // HERE. GETEMPTYTILE ALWAYS RETURNS 3,3 THE INITIAL STARTING POINT
    // THIS NEEDS TO BE FIXED!!!
    // console.log("board in getNeighbors looks like this: ", puzzle.board)
    // console.log("the address of the empty tile is ", currentAddress)

    getEmptyTile(currentNode)
    console.log("Empty tile is at address ", currentAddress)
    let moves = getPossibleMoves()
    console.log("possible moves from current node are ", moves)
    let x = currentAddress[1]
    let y = currentAddress[0]

    for (let i = 0; i < moves.length; i++) {
        getNode(currentNode, moves[i], x, y)
    }

}

export function getSolution (puzzle) {
    let isSolved = false
    // add initial position to queue
    queue.enqueue(puzzle.board)

    // Current issue is that the queue returns undefined before any new unique nodes are added to the queue
    // getPossibleMoves is returning -1!!!!!! something is going wrong there!!!

    while(!isSolved) {
        // currentNode is a Board obj 
        let currentNode = queue.dequeue()
        console.log("current node is ", currentNode)
        queueNeighbors(currentNode)
        if (equals(currentNode,solution)) {
            isSolved = true
            console.log("Solution found!")
        }
    }
}