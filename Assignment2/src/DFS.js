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
let numberOfMoves = 0

let stack = []

// This is to ensure no duplicate nodes are added to the stack
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


/** getNode performs the provided move and adds the new node to the stack
 * if and only if it has not already been added. in addition, it adds the
 * newNode.board to the set
 */
function getNode(currentNode, move, x, y) {
    let newNode = new Node()
    newNode.board = JSON.parse(JSON.stringify(currentNode))    
    
    switch (move) {
        case 'N':
            newNode.board[y][x] = currentNode[y+1][x]
            newNode.board[y+1][x] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return
            }
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: N,', "total moves: ", numberOfMoves)
                appendFile('output.txt', JSON.stringify('move: N,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
            }
            break

        case 'S':
            newNode.board[y][x] = currentNode[y-1][x]
            newNode.board[y-1][x] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return
            }
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: S,', "total moves: ", numberOfMoves)
                appendFile('output.txt', JSON.stringify('move: S,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
            }
            break

        case 'E':
            newNode.board[y][x] = currentNode[y][x-1]
            newNode.board[y][x-1] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return
            } 
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: E,', "total moves: ", numberOfMoves)
                appendFile('output.txt', JSON.stringify('move: E,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
            }
            break
        
        case 'W': 
            newNode.board[y][x] = currentNode[y][x+1]
            newNode.board[y][x+1] = 'X'

            // if node is already in queue, do nothing
            if (set.has(JSON.stringify(newNode.board))) {
                return
            } 
            else {
                stack.push(newNode)
                set.add(JSON.stringify(newNode.board))
                numberOfMoves++
                // console.log('move: W,', "total moves: ", numberOfMoves)
                appendFile('output.txt', JSON.stringify('move: W,', "total moves: ", numberOfMoves), (err) => {
                    if (err) throw err
                })
            }
            break

        default:
            console.log("Something went wrong in 'move' function.")
    }
}

/** getAdjacentNodes arbitrarily chooses a next adjacent node to visit. 
 * if the node has been visited already, check if currentNode has other
 * nodes adjacent. if there arent, back track.
 */
 function getAdjacentNodes (currentNode) {
    let address = getEmptyTile(currentNode.board)
    let moves = getPossibleMoves(address)
    let x = address[1]
    let y = address[0]

    // if there are multiple possible moves, select one of them at random
    if (moves.length > 1) {
        let rand = Math.floor(Math.random() * moves.length) + 1
        getNode(currentNode, moves[rand], x, y)
        console.log("index of randomly selected move is", rand)
    } 

    else getNode(currentNode, moves[0], x, y)

    // I think there should 

}

export function DFSSolution (puzzle) {
    let isSolved = false

    stack.push(puzzle)
    console.log("the stack contains", stack)

    // print initial board state
    // writeFile('output.txt', JSON.stringify(puzzle.board), (err) => {
    //     if (err) throw err
    // })    

    console.log("Calculating DFS solution, this may take awhile... ")

    while(!isSolved) {
        isNext = true
        let currentNode = stack.pop()

        // if current node is solution, puzzle is solved
        if (equals(currentNode, solution)) {
            isSolved = true
            console.log("Solution found!")
        }
        // if current node has not been visited, add it to the set
        if(!set.has(currentNode.board)) {
            set.add(currentNode.board)
        }
        
        // pop root off of stack and visit all adjacent nodes
        // if there is no next node to visit,
        // back track until reaching a node that does have a next node,
        // or until reaching the root.
        // if solution remains unfound, restart from a new random root node

        // while current node has adjacent nodes, push adjacent nodeds to the stack
        while (currentNode.isNext) {
            getAdjacentNodes(currentNode)
        }
    }
}