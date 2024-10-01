import {play} from "../Furca/src/system.js"
import {brickStart, BrickType, main, tuneBrickSprite} from "./data/main.js"
import {emptyTile} from "../Furca/src/tile_map.js"
import {bricks, checkForVictory, fx} from "./main.js"
import {blocksLeft, level, levelParameters, levelTemplate, newTiles} from "./init_level.js"
import {addScore} from "./score.js"
import {Img} from "../Furca/src/image.js"
import {floor} from "../Furca/src/functions.js"
import {getDisappearanceEffect} from "./fill/tile_map_filling_modes.js"
import {createBonus} from "./bonus.js"

export function removeTile(ball, column, row, snd) {
    if(levelTemplate.tileByPos(column, row) < brickStart) {
        play(snd)
        return
    }

    const parameters = getBrick(column, row, false)
    const brick = parameters.brick
    brick.image.x += 192
    column = parameters.column
    row = parameters.row
    const dx = parameters.dx
    const dy = parameters.dy

    blocksLeft.decrement(1 + dx + dy)

    addScore(main.score[dx === 1 ? (dy === 1 ? "single" : "vertical") : "horizontal"])

    checkForVictory()

    bricks.add(brick)
    getDisappearanceEffect(fx, bricks, levelParameters.brickDisappearanceEffect)(brick, ball)

    level.setTileByPos(column, row, emptyTile)
    level.setTileByPos(column + dx, row + dy, emptyTile)

    createBonus(brick)

    play("collision1")
}

export function getBrick(column, row, onlyBase) {
    const tileNum = levelTemplate.tileByPos(column, row)
    let dx = 0, dy = 0

    switch(tileNum) {
        case BrickType.leftBrick:
            dx = 1
            break
        case BrickType.rightBrick:
            dx = 1
            if(onlyBase) return undefined
            column -= 1
            break
        case BrickType.topBrick:
            dy = 1
            break
        case BrickType.bottomBrick:
            if(onlyBase) return undefined
            dy = 1
            row -= 1
            break
    }

    const tile = newTiles.tileByPos(column, row)
    const tileSet = newTiles.tileSet
    const brick = newTiles.tileAngularSpriteByPos(undefined, column, row)
    brick.shift(0.5 * dx, 0.5 * dy)
    brick.setSize(1 + dx, 1 + dy)
    brick.image = new Img(tileSet.texture, (tile % tileSet.columns) * 48, floor(tile / tileSet.columns) * 48
        , 48 * (dx + 1), 48 * (dy + 1))
    tuneBrickSprite(brick)

    return {column: column, row: row, dx: dx, dy: dy, brick: brick}
}