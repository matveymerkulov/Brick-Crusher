import {TileMapFillingEffect} from "./tile_map_filling_effect.js"
import {newTiles} from "../init_level.js"

export class OrthogonalLinearFill extends TileMapFillingEffect {
    #type

    constructor(parameters) {
        super(parameters)
        this.#type = parameters.type
    }

    get stepsQuantity() {
        switch(this.#type) {
            case "leftToRight":
            case "rightToLeft":
                return newTiles.columns
            case "topToBottom":
            case "bottomToTop":
                return newTiles.rows
        }
        throw Error()
    }

    apply(pos) {
        switch(this.#type) {
            case "leftToRight":
                for(let row = 0; row < newTiles.rows; row++) {
                    this.applyToTileByPos(pos, row)
                }
                break
            case "rightToLeft":
                for(let row = 0; row < newTiles.rows; row++) {
                    this.applyToTileByPos(newTiles.columns - 1 - pos, row)
                }
                break
            case "topToBottom":
                for(let column = 0; column < newTiles.columns; column++) {
                    this.applyToTileByPos(column, pos)
                }
                break
            case "bottomToTop":
                for(let column = 0; column < newTiles.columns; column++) {
                    this.applyToTileByPos(column, newTiles.rows - 1 - pos)
                }
                break
            default:
                throw Error()
        }
    }
}