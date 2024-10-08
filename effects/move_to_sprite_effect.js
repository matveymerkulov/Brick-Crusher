import {TimedEffect} from "./timed_effect.js"


export class MoveToSpriteEffect extends TimedEffect {
    #x
    #y
    #toSprite

    constructor(layer, spriteLayer, sprite, toSprite, parameters) {
        super(layer, spriteLayer, sprite, parameters)
        this.#x = sprite.x
        this.#y = sprite.y
        this.#toSprite = toSprite
    }

    apply(sprite, k) {
        let dx = this.#toSprite.x - this.#x
        let dy = this.#toSprite.y - this.#y
        sprite.setPosition(this.#x + dx * k, this.#y + dy * k)
    }
}