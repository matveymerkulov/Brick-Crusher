import {TimedEffect} from "./timed_effect.js"

export class AlphaEffect extends TimedEffect {
    constructor(layer, spriteLayer, sprite, parameters) {
        super(layer, spriteLayer, sprite, parameters)
        if(parameters.type === "forward") {
            sprite.opacity = 0
        }
    }

    apply(sprite, k) {
        sprite.opacity = k
    }
}