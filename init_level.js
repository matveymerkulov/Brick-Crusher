import {project, tileMap} from "../Furca/src/project.js"
import {brickStart, main, messageLabel, paddle} from "./data/main.js"
import {balls, BallState, fx, GameState, lives, setGameState} from "./main.js"
import {Num} from "../Furca/src/variable/number.js"
import {setScore} from "./score.js"
import {getAppearanceEffect, getFillingModeByParameters, getFillingModes} from "./fill/tile_map_filling_modes.js"
import {floor} from "../Furca/src/functions.js"
import {randomizeBrickTextures} from "./randomize_brick_textures.js"
import {loopedSound, stopSound, texture} from "../Furca/src/system.js"
import {Img} from "../Furca/src/image.js"
import {setPaddleWidth} from "./paddle_size.js"
import {Ball} from "./ball.js"
import {fillingMode} from "./data/filling_modes.js"
import {levels} from "./data/levels.js"
import {bonusSettings} from "./data/bonus.js"
import {AngularSprite} from "../Furca/src/angular_sprite.js"
import {removeBonuses} from "./bonus_effect.js"
import {BrickType, getBrickType} from "./brick_type.js"

export const blocksLeft = new Num()
export let level, levelParameters, bonusPack, bonusPackTotal, music
export let levelTemplate, newTiles
export let minPaddleX, maxPaddleX, paddleY, initialBallY

export function initPaddleSize() {
    const d = level.cellWidth + paddle.halfWidth
    minPaddleX = -level.halfWidth + d
    maxPaddleX = level.halfWidth - d
    paddleY = level.halfHeight - paddle.halfHeight
    initialBallY = paddle.top - 0.5 * main.ball.size
}

export function initRound() {
    setPaddleWidth(main.paddle.width)
    initPaddleSize()

    balls.clear()
    let ball = new Ball(0, 9.25, main.ball.size, main.ball.angle, main.ball.speed, BallState.appearing)
    balls.add(ball)

    const effect = getAppearanceEffect(fx, undefined, main.ball.appearanceEffect)(ball)
    effect.next = () => {
        ball.state = BallState.onPaddle
        setGameState(GameState.rolling)
    }

    removeBonuses()
}

export function initLevel() {
    setGameState(GameState.preparing)

    levelParameters = levels.brackets
    levelTemplate = tileMap.brackets

    levelTemplate.setPosition(0, 0)
    tileMap.border.pasteTo(levelTemplate)

    newTiles = levelTemplate.copy()

    bonusPack = bonusSettings.packs[levelParameters.bonusPack]
    bonusPackTotal = 0
    for(const value of Object.values(bonusPack)) {
        bonusPackTotal += value
    }

    level = levelTemplate.copy()
    level.clear()

    lives.value = main.lives
    setScore(0)
    messageLabel.show("")

    project.scene.replace(1, level)

    blocksLeft.value = 0

    levelTemplate.processTilesByIndex((index, tileNum) => {
        newTiles.setTileByIndex(index, tileNum)

        if(getBrickType(tileNum) === BrickType.unbreakableBrick) return

        blocksLeft.increment()
    })

    paddle.setSize(main.paddle.width, main.paddle.height)
    initRound()

    randomizeBrickTextures()

    const array = fillingMode[levelParameters.fillingMode]
    let fill
    for(let parameters of array) {
        if(parameters.hasOwnProperty("negative")) {
            fill = getFillingModeByParameters(fx, parameters)
        } else {
            fill = getFillingModes(fx, parameters)
        }
    }

    stopSound(music)
    music = loopedSound("music" + levelParameters.music, undefined, undefined, false
        , 0.15)

    project.scene.replace(0, new AngularSprite(new Img(texture["background" + levelParameters.background]), 0, 0
        , 40, 22))

    fill.next = () => {
        setGameState(GameState.rolling)
    }
}