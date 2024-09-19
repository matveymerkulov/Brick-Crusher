import {apsk} from "../Furca/src/system.js"
import {abs, sign} from "../Furca/src/functions.js"
import {paddle, settings} from "./settings.js"
import {initPaddleSize} from "./init_level.js"

let actualPaddleWidth = settings.paddle.minWidth

export function updatePaddleWidth() {
    if(paddle.width !== actualPaddleWidth) {
        let difference = actualPaddleWidth - paddle.width
        let d = apsk * settings.paddle.changingSpeed * sign(difference)
        if(abs(difference) < d) {
            paddle.width = actualPaddleWidth
        } else {
            paddle.width += d
        }
        initPaddleSize()
    }
}

export function setPaddleWidth(amount) {
    actualPaddleWidth = amount
}