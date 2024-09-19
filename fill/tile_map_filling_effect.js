import {Effect} from "../effects/effect.js"
import {floor} from "../../Furca/src/functions.js"
import {getBrick} from "../remove_tile.js"
import {level, newTiles} from "../init_level.js"
import {filter} from "./filters.js"
import {getAppearanceEffect} from "./tile_map_filling_modes.js"
import {num} from "../../Furca/src/system.js"
import {bricks, fx} from "../main.js"

export class TileMapFillingEffect extends Effect {
    #brickAppearanceEffect
    #filter
    #negative
    #duration
    #pos
    #startingTime

    constructor(parameters) {
        super(fx)
        this.#brickAppearanceEffect = getAppearanceEffect(fx, bricks, parameters.brickAppearanceEffect)
        this.#filter = filter[parameters.filter]
        this.#negative = parameters.negative
        this.#duration = num(parameters.duration)
        this.#pos = -1
        this.#startingTime = new Date().getTime()
    }

    get stepsQuantity() {
        return 1
    }

    update() {
        let steps = this.stepsQuantity
        let time = (new Date().getTime() - this.#startingTime) / 1000.0 / this.#duration
        let newPos = floor(time * steps)
        if(this.#pos >= steps) {
            this.end()
            return
        }
        while(newPos > this.#pos) {
            this.#pos++
            this.apply(this.#pos)
        }
    }

    next() {}

    apply(pos) {}

    applyToTileByPos(column, row) {
        if(this.#filter(column, row) === this.#negative) return

        const param = getBrick(column, row, true)
        if(param === undefined) return

        const effect = this.#brickAppearanceEffect(param.brick)
        const column2 = column + param.dx
        const row2 = row + param.dy
        effect.next = () => {
            level.setTileByPos(column, row, newTiles.tileByPos(column, row))
            level.setTileByPos(column2, row2, newTiles.tileByPos(column2, row2))
            bricks.remove(param.brick)
        }
    }
}