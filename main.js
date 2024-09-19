import {mouse, mutedSound, num, play, stopSound} from "../Furca/src/system.js"
import {abs, atan2, clamp, rad, sin} from "../Furca/src/functions.js"
import {project} from "../Furca/src/project.js"
import {loadData} from "./data.js"
import {firingPoints, init, livesLabel, messageLabel, paddle, scoreLabel, settings, turrets} from "./settings.js"
import {Layer} from "../Furca/src/layer.js"
import {Num} from "../Furca/src/variable/number.js"
import {
    blocksLeft,
    initialBallY,
    initLevel,
    initRound,
    level,
    maxPaddleX,
    minPaddleX,
    music,
    paddleY
} from "./init_level.js"
import {removeTile} from "./remove_tile.js"
import {updateScore} from "./score.js"
import {Delay} from "./effects/delay.js"
import {updatePaddleWidth} from "./paddle_size.js"
import {Sprite} from "../Furca/src/sprite.js"
import {gun, magnet} from "./bonus_effect.js"

project.getAssets = () => {
    return {
        texture: ["texture/balls.png", "texture/bricks.png", "texture/paddles.png", "background/background[0-7].jpg"
            , "texture/bonus.png", "texture/bonuses.png", "texture/turret.png", "texture/bullet.png", "texture/fire.png"],
        sound: ["sound/collision[1-4].mp3", "music/music[0-4].mp3", "sound/ball_lost.ogg", "music/game_over.mp3"
            , "music/victory.mp3", "sound/bullet.mp3", "sound/bullet_hit.mp3"]
    }
}

export let ballLost, gameOverMusic, victoryMusic, background, gameState, canFire = true

export const balls = new Layer()
export const bonuses = new Layer()
export const fx = new Layer()
export const bricks = new Layer()
export const bullets = new Layer()
export const lives = new Num()
export let deadBalls = [], deadBullets = []

export const BallState = {
    onPaddle: 0,
    rolling: 1,
    appearing: 2,
}

export const GameState = {
    preparing: 0,
    rolling: 1,
    gameOver: 2,
}

export function checkForVictory() {
    if(blocksLeft <= 0) {
        messageLabel.items[0] = "ВЫ ПОБЕДИЛИ!"
        music.pause()
        victoryMusic.play()
    }
}

export function setGameState(state) {
    gameState = state
}

project.init = () => {
    loadData()

    init()

    project.scene.add(background, level, bullets, bonuses, bricks, paddle, balls, turrets, firingPoints
        , livesLabel, messageLabel, scoreLabel)

    initLevel()

    ballLost = mutedSound("ball_lost")
    gameOverMusic = mutedSound("game_over")
    victoryMusic = mutedSound("victory")

    //applyColor()

    const collisionType = {
        none: 0,
        horizontal: 1,
        vertical: 2,
    }

    project.update = () => {
        fx.update()
        bullets.move()

        updateScore()
        updatePaddleWidth()

        paddle.setPosition(clamp(mouse.x, minPaddleX, maxPaddleX), paddleY)

        for(let ball of balls.items) {
            if(ball.state === BallState.rolling) {
                let angleChanged = collisionType.none

                ball.moveHorizontally()
                level.collisionWithSprite(ball, (collisionSprite, tileNum, x, y) => {
                    ball.pushFromSprite(collisionSprite)
                    angleChanged = collisionType.horizontal
                    removeTile(ball, x, y, "collision2")
                })

                ball.moveVertically()
                level.collisionWithSprite(ball, (collisionSprite, tileNum, x, y) => {
                    ball.pushFromSprite(collisionSprite)
                    angleChanged = collisionType.vertical
                    removeTile(ball, x, y, "collision4")
                })

                function alterBallAngle() {
                    return rad(num(settings.ball.alterAngle))
                }

                if(angleChanged === collisionType.horizontal) {
                    ball.angle = rad(180) - ball.angle + alterBallAngle()
                } else if(angleChanged === collisionType.vertical) {
                    ball.angle = -ball.angle + alterBallAngle()
                }

                if(sin(ball.angle) > 0 && ball.collidesWithSprite(paddle)) {
                    ball.pushFromSprite(paddle)
                    ball.paddlePosition = ball.x - paddle.x
                    ball.angle = atan2(-paddle.height, ball.paddlePosition)
                    if(magnet && abs(ball.paddlePosition) < paddle.halfWidth - ball.width) {
                        ball.state = BallState.onPaddle
                    }
                    play("collision3")
                }

                if(ball.topY > paddle.bottomY) {
                    deadBalls.push(ball)
                }
            } else {
                ball.setPosition(paddle.x + ball.paddlePosition, initialBallY)
                if(settings.key.wasPressed) {
                    if(ball.state === BallState.onPaddle) {
                        //music.play()
                        stopSound(victoryMusic)
                        stopSound(gameOverMusic)
                        ball.state = BallState.rolling
                    }

                    if(gameState === GameState.gameOver) {
                        ball.state = BallState.appearing
                        initLevel()
                        ball.show()
                    }
                }
            }
        }

        if(gun) {
            const dx = paddle.halfWidth - 1
            turrets.items[0].setPosition(paddle.x - dx, paddle.y - 1)
            turrets.items[1].setPosition(paddle.x + dx, paddle.y - 1)

            if(canFire && settings.key.isDown) {
                for(let i = 0; i <= 1; i++) {
                    const firingPoint = firingPoints.items[i]
                    const bullet = Sprite.create(settings.turret.bullet)
                    bullet.setPositionAs(firingPoint)
                    bullets.add(bullet)
                }

                firingPoints.show()
                const flameDelay = new Delay(fx, settings.turret.flame.delay)
                flameDelay.next = () => {
                    firingPoints.hide()
                }

                canFire = false
                const coolDown = new Delay(fx, settings.turret.coolDown)
                coolDown.next = () => {
                    canFire = true
                }

                play("bullet")
            }
        }

        for(let bullet of bullets.items) {
            level.collisionWithSprite(bullet, (collisionSprite, tileNum, x, y) => {
                removeTile(bullet, x, y, "bullet_hit")
                deadBullets.push(bullet)
            })
        }
        bullets.removeAll(deadBullets)

        if(deadBalls.length > 0) {
            balls.removeAll(deadBalls)

            if(balls.isEmpty) {
                if(lives.value <= 0) {
                    messageLabel.items[0] = "ИГРА ОКОНЧЕНА"
                    setGameState(GameState.gameOver)
                    gameOverMusic.play()
                    music.pause()
                    return
                }

                ballLost.play()
                setGameState(GameState.preparing)

                const delay = new Delay(fx, settings.lostBallDelay)
                delay.next = () => {
                    lives.decrement()
                    initRound()
                }
            }
        }
    }
}
