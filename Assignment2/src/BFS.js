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
                let address = [[i],[j]]
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

    let x, y = 0

    console.log(address)

    // This aint working :/
    // need to rewrite the different cases
    // need to check if address is = to address on the board
    switch (address) {
        // corners
        // top left
        case x === 0 && y === 0:
            return ['N', 'W']
        // top right 
        case x === 3 && y === 0:
            return ['N', 'E']
        // bottom left
        case x === 0 && y === 3:
            return ['S', 'W']
        // bottom right
        //address[1] == 3 && address[0] == 3
        case address === [[3],[3]]:
            return ['S', 'E']

        // sides
        // top
        case x === 1 && y === 0 || x === 2 && y === 0:
            return ['N', 'E', 'W']
        // bottom
        case x === 1 && y === 3 || x === 2 && y === 3:
            return ['S', 'E', 'W']
        // left side
        case x === 0 && y === 1 || x === 0 && y === 2:
            return ['N', 'S', 'W']
        // right side
        case x === 3 && y === 1 || x === 3 && y === 2:
            return ['N', 'S', 'E']

        // inner square
        default:
            return ['N', 'S', 'E', 'W']
    }    
}

/**getNode recieves list of possible moves from getMoves,
 * and returns all list of new nodes after each move  
 */
export function getNode (Board) {
    let moves = getMove(Board)
    console.log(moves)
}