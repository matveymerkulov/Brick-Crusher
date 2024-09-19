import {Num} from "../Furca/src/variable/number.js"
import {apsk, defaultFontSize} from "../Furca/src/system.js"
import {floor} from "../Furca/src/functions.js"
import {fx} from "./main.js"
import {scoreLabel, settings} from "./settings.js"
import {PulsatingLabel} from "./effects/pulsating_label.js"

export const score = new Num()

let actualScore = 0, scoreEffect, decimalScore = 0

export function updateScore() {
    if(decimalScore < actualScore) {
        decimalScore += apsk * settings.score.raisingSpeed
        if(decimalScore > actualScore) decimalScore = actualScore
        score.value = floor(decimalScore)
    }
}

export function setScore(amount) {
    actualScore = amount
}

export function addScore(amount) {
    setScore(actualScore + amount)
    fx.remove(scoreEffect)
    scoreLabel.fontSize = defaultFontSize
    scoreEffect = new PulsatingLabel(fx, scoreLabel, settings.score)
}