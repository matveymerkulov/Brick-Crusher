import {SpriteEffect} from "./sprite_effect.js"
import {apsk, num} from "../../Furca/src/system.js"
import {boxWithBoxCollision} from "../../Furca/src/collisions.js"
import {rad} from "../../Furca/src/functions.js"
import {currentCanvas} from "../../Furca/src/canvas.js"

export class FallEffect extends SpriteEffect {
    #dx
    #dy
    #gravity
    #angularSpeed
    #dSize

    constructor(layer, spriteLayer, sprite, parameters) {
        super(layer, spriteLayer, sprite)
        this.#dx = num(parameters.dx)
        this.#dy = num(parameters.dy)
        this.#gravity = num(parameters.gravity)
        this.#angularSpeed = rad(num(parameters.angularSpeed))
        this.#dSize = num(parameters.dSize)
        if(this.#dSize === undefined) this.#dSize = 0
    }

    update() {
        this.sprite.shift(this.#dx * apsk, this.#dy * apsk)
        this.#dy += this.#gravity * apsk
        this.sprite.setSize(this.sprite.width * (1 + this.#dSize * apsk)
            , this.sprite.height * (1 + this.#dSize * apsk))
        this.sprite.angle = this.sprite.angle + this.#angularSpeed * apsk
        if(!boxWithBoxCollision(this.sprite, currentCanvas)) {
            this.end()
        }
    }
}