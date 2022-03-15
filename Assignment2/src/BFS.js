import { Queue } from "./Queue.js";

let solution = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 'X']
]
let head = 0;

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
function getEmptyTile (Board) {

    for (let i = 0; i < 4; i++) {
        // console.log("i = ", i)
        for (let j = 0; j < 4; j++) {
            // console.log("j = ", j)
            if(Board[i][j] === 'X') {
                // save the address of the empty tile
                currentAddress = [3,3]
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
export function getPossibleMoves (Board) {
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


/** move performs the provided move, and adds the new node to the queue.
 */
function getNode(Board, move, x, y) {
    // need to create a deep copy of Board so a new node is created after each move
    let newNode = JSON.parse(JSON.stringify(Board))
    
    switch (move) {
        case 'N':
            newNode[y][x] = Board[y+1][x]
            newNode[y+1][x] = 'X'
            if (set.has(newNode)) {
                break
            }
            else {
                queue.enqueue(newNode)
                set.add(newNode)
            }
            console.log("the board after N move", newNode)
            break

        case 'S':
            newNode[y][x] = Board[y-1][x]
            newNode[y-1][x] = 'X'
            if (set.has(newNode)) {
                break
            }
            else {
                queue.enqueue(newNode)
                set.add(newNode)
            }
            console.log("the board after S move", newNode)
            break

        case 'E':
            newNode[y][x] = Board[y][x-1]
            newNode[y][x-1] = 'X'
            if (set.has(newNode)) {
                break
            } 
            else {
                queue.enqueue(newNode)
                set.add(newNode)
            }
            console.log("the board after E move", newNode)
            break
        
        case 'W': 
            newNode[y][x] = Board[y][x+1]
            newNode[y][x+1] = 'X'
            if (set.has(newNode)) {
                break
            } 
            else {
                queue.enqueue(newNode)
                set.add(newNode)
            }
            console.log("the board after W move", newNode)
            break

        default:
            console.log("Something went wrong in 'move' function.")
    }
}

/**getNode recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move.
 * The idea is to queue all neighboring nodes of the starting node
 */
 export function getNeighbors (Board) {
    getEmptyTile(Board)
    let moves = getPossibleMoves(Board)
    let x = currentAddress[1]
    let y = currentAddress[0]

    for (let i = 0; i < moves.length; i++) {
        getNode(Board, moves[i], x, y)
    }
    console.log(queue)
    Board = queue.peekTail()
}

export function getSolution ( Board) {
    // while solution is not found, keep making new nodes and checking them
    let isSolved = false

    // add initial random board to the queue
    queue.enqueue(Board)

    while(!isSolved) {
        getNeighbors(Board)
        let currentNode = queue.dequeue()
        if (JSON.stringify(currentNode) == JSON.stringify(solution)) {
            isSolved = true
            console.log("Solution found")
        }

    }
}