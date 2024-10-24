import {floor, rndi} from "../Furca/src/functions.js"
import {levelParameters, levelTemplate, newTiles} from "./init_level.js"
import {num} from "../Furca/src/system.js"
import {BrickType, getBrickType} from "./brick_type.js"

export function randomizeBrickTextures() {
    const tileSet = levelTemplate.tileSet
    const columns = tileSet.columns
    levelTemplate.processTilesByPos((column, row, tileNum) => {
        let tileColumn = tileSet.tileColumnByIndex(tileNum)
        let tileRow = tileSet.tileRowByIndex(tileNum)
        switch(getBrickType(tileNum)) {
            case BrickType.leftBrick:
                tileNum = tileSet.tileNumByPos(tileColumn + 2 * rndi(2), tileRow + rndi(4))
                newTiles.setTileByPos(column, row, tileNum)
                newTiles.setTileByPos(column + 1, row, tileNum + 1)
                break
            case BrickType.topBrick:
                tileNum = tileSet.tileNumByPos(tileColumn + rndi(4), tileRow + 2 * rndi(2))
                newTiles.setTileByPos(column, row, tileNum)
                newTiles.setTileByPos(column, row + 1, tileNum + columns)
                break
            case BrickType.singleBrick:
                tileNum = tileSet.tileNumByPos(tileColumn + rndi(4), tileRow + rndi(2))
                newTiles.setTileByPos(column, row, tileNum)
                break
            case BrickType.unbreakableBrick:
                newTiles.setTileByPos(column, row, tileNum)
                break
        }
    })
}