import {BrickType} from "./settings.js"
import {floor, rndi} from "../Furca/src/functions.js"
import {levelParameters, levelTemplate, newTiles} from "./init_level.js"
import {num} from "../Furca/src/system.js"

export function randomizeBrickTextures() {
    const columns = levelTemplate.tileSet.columns
    const breakableTheme = num(levelParameters.breakableTheme) * 4
    const unbreakableTheme = num(levelParameters.unbreakableTheme) * 4
    levelTemplate.processTilesByPos((column, row, tileNum) => {
        let index
        switch(tileNum) {
            case BrickType.leftBrick:
                index = breakableTheme + rndi(2) * 2 + columns * (4 + rndi(4))
                newTiles.setTileByPos(column, row, index)
                newTiles.setTileByPos(column + 1, row, index + 1)
                break
            case BrickType.topBrick:
                index = breakableTheme + rndi(4) + columns * (8 + rndi(2) * 2)
                newTiles.setTileByPos(column, row, index)
                newTiles.setTileByPos(column, row + 1, index + columns)
                break
            case BrickType.singleBrick:
                index = breakableTheme + rndi(4) + columns * (12 + rndi(2))
                newTiles.setTileByPos(column, row, index)
                break
            default:
                if(tileNum >= 16) return
                index = tileNum % 4 + unbreakableTheme + columns * floor(tileNum / 4)
                newTiles.setTileByPos(column, row, index)
                break
        }
    })
}