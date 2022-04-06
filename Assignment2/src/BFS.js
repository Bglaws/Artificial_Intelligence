import { Queue } from "./Queue.js";
import { Node } from "./Node.js"
import { writeFile, appendFile } from "fs";

// Solution to the puzzle
let solution = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 'X']
]

// Total number of moves performed to find solution
let graphDepth = 0

// Queue for keeping track of order of the nodes
let queue = new Queue()

// Need to use a hashset in conjunction with queue. 
// This is to ensure no duplicate nodes are added to the queue
let set = new Set()

// for array comparisons
const equals = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

// returns the position of the empty tile
function getEmptyTile (currentNode) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(currentNode[i][j] === 'X') {
                // save the address of the empty tile
                return [i, j]
            }
        }
    }
}

/**getPossibleMoves returns all possible moves from a given node
 * i.e. 'N' 'S' 'E' 'W'
 */
function getPossibleMoves (address) {

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
    else if (equals(address, [0,1]) || equals(address, [0,2])) return ['N', 'E', 'W']
    // bottom
    else if (equals(address, [3,1]) || equals(address, [3,2])) return ['S', 'E', 'W']
    // left side
    else if (equals(address, [1,0]) || equals(address, [2,0])) return ['N', 'S', 'W']
    // right side 
    else if (equals(address, [1,3]) || equals(address, [2,3])) return ['N', 'S', 'E']

    // inner circle
    // upper left
    else if (equals(address, [1,1])) return ['N','S','E','W']
    // upper right
    else if (equals(address, [1,2])) return ['N','S','E','W']
    // bottom left
    else if (equals(address, [2,1])) return ['N','S','E','W']
    // bottom right
    else if (equals(address, [2,2])) return ['N','S','E','W']

    else {
        console.log("getPossibleMoves is not working")
        return -1
    }
}

/** getNode performs the provided move, and adds the new node to the queue
 * if and only if it has not already been added  
 */
function getNode(currentNode, move, x, y) {
    let newNode = new Node()
    newNode.board = JSON.parse(JSON.stringify(currentNode.board))
    newNode.moveHistory = JSON.parse(JSON.stringify(currentNode.moveHistory))

    switch (move) {
        case 'N':
            newNode.board[y][x] = currentNode.board[y+1][x]
            newNode.board[y+1][x] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return
            }
            else {
                newNode.moveHistory.push(move)
                newNode.depth = newNode.moveHistory.length
                queue.enqueue(newNode)
                set.add(JSON.stringify(newNode.board))
            }
            break

        case 'S':
            newNode.board[y][x] = currentNode.board[y-1][x]
            newNode.board[y-1][x] = 'X'

            if (set.has(JSON.stringify(newNode.board))) {
                return
            }
            else {
                newNode.moveHistory.push(move)
                newNode.depth = newNode.moveHistory.length
                queue.enqueue(newNode)
                set.add(JSON.stringify(newNode.board))
            }
            break

        case 'E':
            newNode.board[y][x] = currentNode.board[y][x-1]
            newNode.board[y][x-1] = 'X'

            if (set.has(JSON.stringify(newNode.board))) {
                return
            } 
            else {
                newNode.moveHistory.push(move)
                newNode.depth = newNode.moveHistory.length
                queue.enqueue(newNode)
                set.add(JSON.stringify(newNode.board))
            }
            break
        
        case 'W': 
            newNode.board[y][x] = currentNode.board[y][x+1]
            newNode.board[y][x+1] = 'X'

            if (set.has(JSON.stringify(newNode.board))) {
                return
            } 
            else {
                newNode.moveHistory.push(move)
                newNode.depth = newNode.moveHistory.length
                queue.enqueue(newNode)
                set.add(JSON.stringify(newNode.board))
            }
            break

        default:
            console.log("Something went wrong in 'move' function.")
            return -1
    }
}

/**queueNeighbors recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move.
 * The idea is to queue all neighboring nodes of the given node
 */
function queueNeighbors (currentNode) {
    let address = getEmptyTile(currentNode.board)
    let moves = getPossibleMoves(address)
    let x = address[1]
    let y = address[0]

    for (let i = 0; i < moves.length; i++) {
        getNode(currentNode, moves[i], x, y)
    }
    // this does not accurately keep track of node depth
    graphDepth++
}

export function BFSSolution (puzzle) {
    // add initial position to queue
    queue.enqueue(puzzle)
    graphDepth++

    // print initial board state
    let str = "Original board:  " + JSON.stringify(puzzle.board) +"\n\n"
    writeFile('BFSoutput.txt', str, (err) => {
        if (err) throw err
    })    

    console.log("Calculating BFS solution, this may take awhile... ")

    while(true) {
        let currentNode = queue.dequeue()
        console.log("currentNode in main is", currentNode)

        if (equals(currentNode.board, solution)) {
            console.log("Solution found!")

            let output = "moves made: " + JSON.stringify(currentNode.moveHistory) + 
            ". Solution found in " + JSON.stringify(currentNode.depth) + " moves!"

            appendFile('BFSoutput.txt', output, (err) => {
                if (err) throw err
            })    
            break
        }
        queueNeighbors(currentNode)
    }
}
