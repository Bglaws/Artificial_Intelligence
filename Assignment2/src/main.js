import { randomNums, fillBoard, printBoard } from "./Board.js";
import { writeFile } from "fs";


let Board = [
    [, , , ],
    [, , , ],
    [, , , ],
    [, , , ]
]

let data = 'Does this even work?'


fillBoard(randomNums(), Board)

writeFile('output.txt', Board.toString(), (err) => {
    if (err) throw err
})

printBoard(Board)
//console.log(Board)
