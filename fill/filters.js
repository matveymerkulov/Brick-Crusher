import {brickStart} from "../settings.js"
import {newTiles} from "../init_level.js"

export const filter = {
    all: (column, row) => {
        return true
    },

    breakable: (column, row) => {
        return newTiles.tileByPos(column, row) < brickStart
    },

    chessboard: (column, row) => {
        return (column + row) % 2 === 0
    },

    interlacedRows: (column, row) => {
        return row % 2 === 0
    },

    interlacedColumns: (column, row) => {
        return column % 2 === 0
    },
}