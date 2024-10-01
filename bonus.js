import {Sprite} from "../Furca/src/sprite.js"
import {currentCanvas} from "../Furca/src/canvas.js"
import {paddle} from "./data/main.js"
import {bonuses, fx, GameState, gameState} from "./main.js"
import {apsk, num} from "../Furca/src/system.js"
import {boxWithBoxCollision} from "../Furca/src/collisions.js"
import {rndi} from "../Furca/src/functions.js"
import {getAppearanceEffect, getDisappearanceEffect} from "./fill/tile_map_filling_modes.js"
import {MoveToSpriteEffect} from "./effects/move_to_sprite_effect.js"
import {ImageArray} from "../Furca/src/image_array.js"
import {bonusSettings} from "./data/bonus.js"
import {Img} from "../Furca/src/image.js"
import {bonusEffect} from "./bonus_effect.js"
import {bonusPack, bonusPackTotal} from "./init_level.js"
import {AngularSprite} from "../Furca/src/angular_sprite.js"

const BonusState = {
    appearing: 0,
    moving: 1,
    disappearing: 2,
}

export class Bonus extends Sprite {
    #typeXK
    #typeYK
    #state
    #type
    #typeSprite
    #speed

    constructor(x, y, width, height, type, speed, typeXK, typeYK) {
        super(Img.create(bonusSettings.image), x, y, width, height)
        this.#typeXK = typeXK
        this.#typeYK = typeYK
        this.#type = type
        this.#typeSprite = new AngularSprite(ImageArray.create(bonusSettings.images).image(type.imageNumber))
        this.#state = BonusState.appearing
        this.#speed = num(speed)
        const effect = getAppearanceEffect(fx, bonuses, bonusSettings.appearanceEffect)(this)
        effect.next = () => {
            this.#state = BonusState.moving
        }
    }

    draw() {
        super.draw()
        this.#typeSprite.setPositionAs(this)
        this.#typeSprite.setSize(num(this.#typeXK) * this.width, num(this.#typeYK) * this.height)
        this.#typeSprite.draw()
    }

    update() {
        if(this.#state === BonusState.disappearing) return

        if(gameState !== GameState.rolling) {
            this.disappear(false)
            return
        }

        if(this.#state === BonusState.moving) {
            this.y += this.#speed * apsk
        }

        if(!boxWithBoxCollision(this, currentCanvas)) {
            bonuses.remove(this)
        }

        if(this.collidesWithSprite(paddle)) {
            this.disappear(true)
        }
    }

    disappear(applyEffect) {
        this.#state = BonusState.disappearing
        const effect = getDisappearanceEffect(fx, bonuses, bonusSettings.disappearanceEffect)(this)

        if(applyEffect) {
            effect.next = () => {
                bonusEffect(this.#type)
            }

            new MoveToSpriteEffect(fx, undefined, this, paddle, {
                type: "forward",
                duration: 0.5,
            })
        }
    }
}

export function createBonus(brick) {
    let position = rndi(bonusPackTotal)
    for(const [key, value] of Object.entries(bonusPack)) {
        if(position < value) {
            if(key === "nothing") return
            new Bonus(brick.x, brick.y, num(bonusSettings.width), num(bonusSettings.height), bonusSettings.type[key]
                , bonusSettings.speed, bonusSettings.typeWidthK, bonusSettings.typeHeightK)
            return
        }
        position -= value
    }
}