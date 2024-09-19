import {TileMapFillingEffect} from "./tile_map_filling_effect.js"
import {dist, floor, sqrt} from "../../lib/functions.js"
import {newTiles} from "../init_level.js"

export class RadialFill extends TileMapFillingEffect {
    #type
    #array

    constructor(parameters) {
        super(parameters)
        this.#type = parameters.type
        this.#array = new Array(newTiles.quantity)
    }

    get stepsQuantity() {
        return floor(dist(newTiles.halfWidth, newTiles.halfHeight))
    }

    apply(pos) {
        if(this.#type === "in") {
            pos = this.stepsQuantity - pos
        }

        const centerX = newTiles.halfWidth
        const centerY = newTiles.halfHeight

        for(let dy = -pos; dy < pos; dy++) {
            for(let dx = -pos; dx < pos; dx++) {
                let length = sqrt(dx * dx + dy * dy)
                if(length > pos + 1 || length < pos - 1) continue
                const column = centerX + dx
                const row = centerY + dy
                const index = column + row * newTiles.columns
                if(this.#array[index]) continue
                this.applyToTileByPos(column, row)
                this.#array[index] = true
            }
        }
    }
}