import {atan2, cos, dist, rad, sin} from "../../Furca/src/functions.js"
import {level, newTiles} from "../init_level.js"
import {getBrick} from "../remove_tile.js"
import {Effect} from "../effects/effect.js"
import {num} from "../../Furca/src/system.js"

export class VortexFill extends Effect {
    #parameters
    #maxDuration
    #startingTime

    constructor(parameters) {
        super(fx)
        this.#parameters = []
        this.#startingTime = new Date().getTime()
        this.#maxDuration = 0

        let minDistance = 0.5 * dist(newTiles.columns, newTiles.rows) + 2
        for(let row = 0; row <= newTiles.rows; row++) {
            for(let column = 0; column <= newTiles.columns; column++) {
                let brickParameters = getBrick(column, row, true)
                if(brickParameters === undefined) continue
                let brick = brickParameters.brick
                brickParameters.startingDistance = num(parameters.dDistance) + minDistance
                brickParameters.endingDistance = dist(brick.x, brick.y)
                brickParameters.angle = atan2(brick.y, brick.x)
                brickParameters.dAngle = rad(num(parameters.dAngle))
                brickParameters.dImageAngle = rad(num(parameters.dImageAngle))
                let duration = num(parameters.duration)
                if(this.#maxDuration < duration) this.#maxDuration = duration
                brickParameters.duration = duration
                this.#parameters.push(brickParameters)
            }
        }
    }

    draw() {
        for(let parameters of this.#parameters) {
            parameters.brick.draw()
        }
    }

    update() {
        let time = (new Date().getTime() - this.#startingTime) / 1000.0
        if(time > this.#maxDuration) {
            this.end()
            return
        }

        for(let parameters of this.#parameters) {
            let time2 = time / parameters.duration
            if(time2 > 1) time2 = 1
            let brick = parameters.brick
            const distance = parameters.startingDistance * (1 - time2) + parameters.endingDistance * time2
            let angle = parameters.angle * time2 + (1 - time2) * parameters.dAngle
            brick.x = distance * cos(angle)
            brick.y = distance * sin(angle)
            brick.imageAngle = (1 - time2) * parameters.dImageAngle
        }
    }

    end() {
        super.end()
        for(let parameters of this.#parameters) {
            const column = parameters.column
            const row = parameters.row
            const column2 = column + parameters.dx
            const row2 = row + parameters.dy
            level.setTileByPos(column, row, newTiles.tileByPos(column, row))
            level.setTileByPos(column2, row2, newTiles.tileByPos(column2, row2))
        }
    }
}