import {Effect} from "./effect.js"

export class SpriteEffect extends Effect {
    #sprite
    #spriteLayer

    constructor(layer, spriteLayer, sprite) {
        super(layer)
        this.#sprite = sprite
        this.#spriteLayer = spriteLayer
    }

    get sprite() {
        return this.#sprite
    }

    addSprite() {
        if(this.#spriteLayer !== undefined) this.#spriteLayer.add(this.#sprite)
    }

    removeSprite() {
        if(this.#spriteLayer !== undefined) this.#spriteLayer.remove(this.#sprite)
    }
}