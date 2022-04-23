import { Node } from "./Node.js"
import { writeFile, appendFile } from "fs";
import { exit } from "process";
import { SOLUTION } from "./Solution.js";

// for array comparisons
const equals = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

// This is to ensure no duplicate nodes are added to the queue
let set = new Set()

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

let solutionFound = false
let solvedNode = 0

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

function getNeighbor (currentNode, move, x, y) {
    let newNode = new Node()
    newNode.board = JSON.parse(JSON.stringify(currentNode.board))    
    newNode.moveHistory = JSON.parse(JSON.stringify(currentNode.moveHistory))

    switch (move) {
        case 'N':
            newNode.board[y][x] = currentNode.board[y+1][x]
            newNode.board[y+1][x] = 'X'
            newNode.moveHistory.push(move)
            newNode.depth = newNode.moveHistory.length
            return newNode

        case 'S':
            newNode.board[y][x] = currentNode.board[y-1][x]
            newNode.board[y-1][x] = 'X'
            newNode.moveHistory.push(move)
            newNode.depth = newNode.moveHistory.length
            return newNode

        case 'E':
            newNode.board[y][x] = currentNode.board[y][x-1]
            newNode.board[y][x-1] = 'X'
            newNode.moveHistory.push(move)
            newNode.depth = newNode.moveHistory.length
            return newNode
        
        case 'W': 
            newNode.board[y][x] = currentNode.board[y][x+1]
            newNode.board[y][x+1] = 'X'
            newNode.moveHistory.push(move)
            newNode.depth = newNode.moveHistory.length
            return newNode

        default:
            console.log("Something went wrong in 'pushNextNode' function.")
    }
}

function recursiveDFS(currentNode) {
    console.log("currentNode is", currentNode)

    if (equals(currentNode.board, SOLUTION)) {
        console.log("Solution found! See DFS.txt for more information.")
        solutionFound = true
        solvedNode = currentNode
        return 
    }
    // node is not solution and has been visited. backtrack.
    else if (set.has(JSON.stringify(currentNode.board))) {
        return 
    } 

    // node is not solution, but it is unvisited. search neighbors
    else {
        // mark current node as visited
        set.add(JSON.stringify(currentNode.board))
        
        let address = getEmptyTile(currentNode.board)
        let moves = getPossibleMoves(address)
        let x = address[1]
        let y = address[0]

        // for each neighbor, depth first search
        let successfulPush = false
        while (successfulPush === false && moves.length > 0) {
            let rand = Math.floor(Math.random() * moves.length) 
            recursiveDFS(getNeighbor(currentNode, moves[rand], x, y))
            if (solutionFound) {
                return
            }
            moves.splice(rand, 1)
        }
    }
}

export function DFSHandler (puzzle) {

    // print starting position
    let str = "Original board:  " + JSON.stringify(puzzle.board) +"\n\n"
    writeFile('../output/DFS.txt', str, (err) => {
        if (err) throw err
    })       

    console.log("Calculating DFS solution, this may take a while... ")
    recursiveDFS(puzzle) 

    let results = "moves made: " + JSON.stringify(solvedNode.moveHistory) + 
    ". Solution found in " + JSON.stringify(solvedNode.depth) + " moves!"

    appendFile('../output/DFS.txt', results, (err) => {
        if (err) throw err
    }) 
}