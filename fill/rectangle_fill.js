import {TileMapFillingEffect} from "./tile_map_filling_effect.js"
import {newTiles} from "../init_level.js"

export class RectangleFill extends TileMapFillingEffect {
    #type

    constructor(parameters) {
        super(parameters)
        this.#type = parameters.type
    }

    get stepsQuantity() {
        return newTiles.halfHeight - 1
    }

    apply(pos) {
        if(this.#type === "out") {
            pos = newTiles.halfHeight - 1 - pos
        }

        for(let column = pos + 1; column < newTiles.width - 1 - pos; column++) {
            this.applyToTileByPos(column, pos)
            this.applyToTileByPos(column, newTiles.height - 1 - pos)
        }

        for(let row = pos; row < newTiles.height - pos; row++) {
            this.applyToTileByPos(pos, row)
            this.applyToTileByPos(newTiles.width - 1 - pos, row)
        }
    }
}