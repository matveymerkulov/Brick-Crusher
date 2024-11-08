import {paddle, turrets} from "./data/main.js"
import {setPaddleWidth} from "./paddle_size.js"
import {initPaddleSize} from "./init_level.js"
import {balls, BallState, lives} from "./main.js"
import {addScore} from "./score.js"
import {Ball} from "./ball.js"
import {removeFromArrayByIndex} from "../Furca/src/functions.js"
import {play} from "../Furca/src/system.js"

export let magnet = false, gun = false

export function removeBonuses() {
    magnet = false
    gun = false
    turrets.hide()
}

export function bonusEffect(type) {
    switch(type.class) {
        case "resize":
            const amount = type.amount
            let total = paddle.width + amount
            if(amount < 0) {
                if(type.min !== undefined && type.min > total) total = type.min
                play("shrink")
            } else {
                if(type.max !== undefined && type.max < total) total = type.max
                play("stretch")
            }
            setPaddleWidth(total)
            initPaddleSize()
            break
        case "ball":
            lives.value += type.amount
            play("life")
            break
        case "score":
            addScore(type.amount)
            play("score")
            break
        case "split":
            play("split")
            let quantity = balls.quantity
            for(let i = 0; i < quantity; i++) {
                let ball = balls.items[0]
                for(let j = 0; j < type.amount; j++) {
                    let angle = ball.angle + type.startingAngle + j * type.dAngle
                    balls.add(new Ball(ball.x, ball.y, ball.width, angle, ball.speed, BallState.rolling))
                }
                removeFromArrayByIndex(0, balls.items)
            }
            break
        case "magnet":
            play("magnet")
            magnet = true
            break
        case "gun":
            play("gun")
            gun = true
            turrets.show()
            break
        case "ammo":
            break
        default:
            throw Error()
    }
}