import {TimedEffect} from "./timed_effect.js"

export class ResizingEffect extends TimedEffect {
    #width
    #height

    constructor(layer, spriteLayer, sprite, parameters) {
        super(layer, spriteLayer, sprite, parameters)
        this.#width = sprite.width
        this.#height = sprite.height
        if(parameters.type === "forward") {
            sprite.setSize(0, 0)
        }
    }

    apply(sprite, k) {
        sprite.setSize(this.#width * k, this.#height * k)
    }
}