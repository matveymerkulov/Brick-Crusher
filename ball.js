import {Sprite} from "../Furca/src/sprite.js"
import {ShapeType} from "../Furca/src/shape.js"
import {settings} from "./settings.js"
import {Img} from "../Furca/src/image.js"

export class Ball extends Sprite {
    state
    paddlePosition

    constructor(x, y, size, angle, speed, state, position = 0) {
        super(Img.create(settings.ball.image), x, y, size, size, ShapeType.circle, angle, speed)
        this.state = state
        this.paddlePosition = position
    }
}