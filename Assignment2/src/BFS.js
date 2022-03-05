
const solution = false

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
            if(Board[i][j] === undefined) {
                // save the address of the empty tile
                let address = [3,3]
                return address
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
export function getMove (Board) {
    const address = getEmptyTile(Board)

    // console.log(address)

    console.log(Board)

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

}

/**getNode recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move  
 */
export function getNode (Board) {
    let moves = getMove(Board)
    // console.log(moves)

    // this for loop performs the moves, and return the subsequent nodes
    for (let i = 0; i < moves.length; i++) {

    }
}

function getSolution () {
    // while solution is not found, keep making new nodes and checking them
    for (let i = 0; !solution; i ++) {
        
    }    
}