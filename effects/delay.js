import {Effect} from "./effect.js"
import {num} from "../../Furca/src/system.js"

export class Delay extends Effect {
    #duration
    #startingTime

    constructor(layer, parameters) {
        super(layer)
        this.#duration = num(parameters.duration)
        this.#startingTime = new Date().getTime()
    }

    update() {
        this.execute()
    }

    execute() {
        if((new Date().getTime() - this.#startingTime) / 1000.0 >= this.#duration) {
            this.end()
        }
    }

    next() {
    }
}