import {tileSet} from "../Furca/src/project.js"
import {floor} from "../Furca/src/functions.js"

export const BrickType = {
    unbreakableBrick: Symbol("unbreakableBrick"),
    leftBrick: Symbol("leftBrick"),
    rightBrick: Symbol("rightBrick"),
    topBrick: Symbol("topBrick"),
    bottomBrick: Symbol("bottomBrick"),
    singleBrick: Symbol("singleBrick"),
}

export function getBrickType(tileNum) {
    let column = tileNum % tileSet.bricks.columns
    let row = floor(tileNum / tileSet.bricks.columns)
    if(row < 4) return BrickType.unbreakableBrick
    if(row < 8) return column % 2 === 0 ? BrickType.leftBrick : BrickType.rightBrick
    if(row < 12) return row % 2 === 0 ? BrickType.topBrick : BrickType.bottomBrick
    return BrickType.singleBrick
}