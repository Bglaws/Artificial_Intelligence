import { Node } from "./Node.js"
import { Stack } from "./Stack.js";
import { writeFile, appendFile } from "fs";

// Solution to the puzzle
let solved = false
let solution = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 'X']
]

let stack = new Stack()

// This is to ensure no duplicate nodes are added to the stack
let set = new Set()

// Total number of moves performed to find solution
let numberOfMoves = 0

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


/** getNode performs the provided move and adds the new node to the stack
 * if and only if it has not already been added. in addition, it adds the
 * newNode.board to the set
 */
function pushNextNode (currentNode, move, x, y) {
    let newNode = new Node()
    newNode.board = JSON.parse(JSON.stringify(currentNode.board))    

    switch (move) {
        case 'N':
            newNode.board[y][x] = currentNode.board[y+1][x]
            newNode.board[y+1][x] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return false
            }
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: N,', "total moves: ", numberOfMoves)
                appendFile('DFSoutput.txt', JSON.stringify('move: N,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
                return true
            }

        case 'S':
            newNode.board[y][x] = currentNode.board[y-1][x]
            newNode.board[y-1][x] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return false
            }
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: S,', "total moves: ", numberOfMoves)
                appendFile('DFSoutput.txt', JSON.stringify('move: S,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
                return true
            }

        case 'E':
            newNode.board[y][x] = currentNode.board[y][x-1]
            newNode.board[y][x-1] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return false
            } 
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: E,', "total moves: ", numberOfMoves)
                appendFile('DFSoutput.txt', JSON.stringify('move: E,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
                return true
            }
        
        case 'W': 
            newNode.board[y][x] = currentNode.board[y][x+1]
            newNode.board[y][x+1] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return false
            } 
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: W,', "total moves: ", numberOfMoves)
                appendFile('DFSoutput.txt', JSON.stringify('move: W,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
                return true
            }

        default:
            console.log("Something went wrong in 'pushNextNode' function.")
    }
}

/**getAdjacentNodes arbitrarily chooses a next adjacent node to visit. 
 * if the node has been visited already, check if currentNode has other
 * nodes adjacent. if there arent, back track.
 */
 function getAdjacentNode (currentNode) {
    let address = getEmptyTile(currentNode.board)
    let moves = getPossibleMoves(address)
    let x = address[1]
    let y = address[0]

    /**This while loop does the following:
     * it selects a random move from moves[]
     * it attempts to push the node created from the corresponding move to the stack
     * if that node has previously been visited, pushNextNode returns false, and another move is chosen
     * if there are no more moves left, no new node has been added to the stack.
     * the stack will then backtrack until it finds a node with an unvisted neighbor.
     */
    let successfulPush = false
    while (successfulPush === false && moves.length > 0) {
        let rand = Math.floor(Math.random() * moves.length)
        console.log("move is", moves[rand]) 
        successfulPush = pushNextNode(currentNode, moves[rand], x, y)
        moves.splice(rand, 1)
    }

}

export function DFSSolution (puzzle) {
    stack.push(puzzle)
    let currentNode = 0
    // print initial board state
    writeFile('DFSoutput.txt', JSON.stringify(puzzle.board), (err) => {
        if (err) throw err
    })    

    console.log("Calculating DFS solution, this may take awhile... ")

    while(!solved) {
        // set currentNode to the new node that was pushed to the top of stack
        let currentNode = stack.pop()
        console.log("currentPosition:", currentNode.board, "total moves:", numberOfMoves)

        // if current node is solution, puzzle is solved
        if (equals(currentNode.board, solution)) {
            solved = true
            console.log("Solution found!")
            console.log("the solution was found after", numberOfMoves, "move(s).", currentNode)
            
            appendFile('DFSoutput.txt', JSON.stringify("total moves: ", numberOfMoves, "final solution", currentNode), (err) => {
                if (err) throw err
            })
            break
        }
        // if current node has not been visited, add it to the set
        // if(!set.has(JSON.stringify(currentNode.board))) {
        //     set.add(JSON.stringify(currentNode.board))
        // }
        getAdjacentNode(currentNode)

    }
}