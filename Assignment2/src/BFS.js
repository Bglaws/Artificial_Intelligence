
const solution = false

// current address of empty tile
let currentAddress = []

// for array comparisons
const equals = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

function Queue () {

}

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

/**getNode recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move  
 */


export function getNode (Board) {
    getEmptyTile(Board)
    let moves = getPossibleMoves(Board)
    let x = currentAddress[1]
    let y = currentAddress[0]

    for (let i = 0; i < moves.length; i++) {
        move(Board, moves[i], x, y)
    }
}


/** move performs the provided move, and adds the new node to the queue.
 */
function move(Board, move, x, y) {
    // need to create a deep copy of Board so a new node is created after each move
    let arr = JSON.parse(JSON.stringify(Board))
    console.log("new node looks like this ", arr)

    
    if (move === 'N') {
        arr[y][x] = Board[y+1][x]
        arr[y+1][x] = 'X'
        console.log(arr)
    }
    else if (move === 'S') {
        arr[y][x] = Board[y-1][x]
        arr[y-1][x] = 'X'
        console.log(arr)
    }
    else if (move === 'E') {
        arr[y][x] = Board[y][x-1]
        arr[y][x-1] = 'X'
        console.log(arr)
    }
    else if (move === 'W') {
        arr[y][x] = Board[y][x+1]
        arr[y][x+1] = 'X'
        console.log(arr)
    }
}

function getSolution () {
    // while solution is not found, keep making new nodes and checking them
    for (let i = 0; !solution; i ++) {
        
    }    
}