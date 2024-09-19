import {TileMapFillingEffect} from "./tile_map_filling_effect.js"
import {shuffleArray} from "../../lib/functions.js"
import {newTiles} from "../init_level.js"

export class RandomFill extends TileMapFillingEffect {
    #tile

    constructor(parameters) {
        super(parameters)

        const quantity = newTiles.quantity
        this.#tile = new Array(quantity)
        for(let i = 0; i < quantity; i++) {
            this.#tile[i] = i
        }

        shuffleArray(this.#tile)
    }

    get stepsQuantity() {
        return newTiles.quantity
    }

    apply(pos) {
        let index = this.#tile[pos]
        this.applyToTileByPos(newTiles.tileColumn(index), newTiles.tileRow(index))
    }
}