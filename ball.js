import {ShapeType} from "../Furca/src/shape.js"
import {main} from "./data/main.js"
import {Img} from "../Furca/src/image.js"
import {AngularSprite} from "../Furca/src/angular_sprite.js"

export class Ball extends AngularSprite {
    state
    paddlePosition

    constructor(x, y, size, angle, speed, state, position = 0) {
        super(Img.create(main.ball.image), x, y, size, size, ShapeType.circle, angle, speed)
        this.state = state
        this.paddlePosition = position
    }
}