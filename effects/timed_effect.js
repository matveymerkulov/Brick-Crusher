import {SpriteEffect} from "./sprite_effect.js"
import {num} from "../../Furca/src/system.js"

export class TimedEffect extends SpriteEffect {
    #duration
    #startingTime
    #type

    constructor(layer, spriteLayer, sprite, parameters) {
        super(layer, spriteLayer, sprite)
        this.#duration = num(parameters.duration)
        this.#type = parameters.type
        this.#startingTime = new Date().getTime()
        if(this.#type === "forward") this.addSprite()
    }

    update() {
        let time = (new Date().getTime() - this.#startingTime) / 1000.0 / this.#duration
        if(time > 1.0) {
            this.end()
            return
        }
        this.apply(this.sprite, this.#type === "forward" ? time : 1.0 - time)
    }

    apply(sprite, k) {
    }

    end() {
        if(this.#type !== "forward") this.removeSprite()
        super.end()
    }
}