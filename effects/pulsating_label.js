import {TimedEffect} from "./timed_effect.js"
import {pi, sin} from "../../Furca/src/functions.js"
import {num} from "../../Furca/src/system.js"

export class PulsatingLabel extends TimedEffect {
    #fontSize
    #dSize

    constructor(layer, label, parameters) {
        parameters.type = "forward"
        super(layer, undefined, label, parameters)
        this.#fontSize = label.fontSize
        this.#dSize = num(parameters.dSize)
    }

    apply(label, k) {
        label.fontSize = this.#fontSize + sin(2 * pi * k) * this.#dSize
    }
}