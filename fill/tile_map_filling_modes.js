import {OrthogonalLinearFill} from "./orthogonal_linear_fill.js"
import {ResizingEffect} from "../effects/resizing_effect.js"
import {AlphaEffect} from "../effects/alpha_effect.js"
import {RandomFill} from "./random_fill.js"
import {RectangleFill} from "./rectangle_fill.js"
import {RadialFill} from "./radial_fill.js"
import {FallEffect} from "../effects/fall_effect.js"
import {KickEffect} from "../effects/kick_effect.js"
import {VortexFill} from "./vortex_fill.js"
import {appearanceEffect, disappearanceEffect} from "../data/appearance.js"
import {fillingMode} from "../data/filling_modes.js"

export function getAppearanceEffect(layer, brickLayer, name) {
    const parameters = appearanceEffect[name]
    switch(parameters.class) {
        case "resize":
            return (brick) => {
                return new ResizingEffect(layer, brickLayer, brick, parameters)
            }
        case "alpha":
            return (brick) => {
                return new AlphaEffect(layer, brickLayer, brick, parameters)
            }
    }
    throw Error()
}

export function getDisappearanceEffect(layer, brickLayer, name) {
    const parameters = disappearanceEffect[name]
    switch(parameters.class) {
        case "resize":
            return (brick) => {
                return new ResizingEffect(layer, brickLayer, brick, parameters)
            }
        case "alpha":
            return (brick) => {
                return new AlphaEffect(layer, brickLayer, brick, parameters)
            }
        case "fall":
            return (brick) => {
                return new FallEffect(layer, brickLayer, brick, parameters)
            }
        case "kick":
            return (brick, ball) => {
                return new KickEffect(layer, brickLayer, ball, brick, parameters)
            }
    }
    throw Error()
}

export function getFillingModes(layer, parameters) {
    let fill, type
    for(let i = 0; i < 2; i++) {
        const negative = i > 0
        switch(parameters.class) {
            case "horizontal":
                type = negative ? "leftToRight" : "rightToLeft"
                break
            case "vertical":
                type = negative ? "topToBottom" : "bottomToTop"
                break
            case "rectangle":
                type = negative ? "in" : "out"
                break
            case "radial":
                type = negative ? "in" : "out"
                break
            default:
                throw Error()
        }
        parameters.type = type
        parameters.negative = negative
        fill = getFillingModeByParameters(layer, parameters)
        delete parameters.negative
    }
    return fill
}

export function getFillingModeByName(layer, name) {
    const array = fillingMode[name]
    let fill
    for(let parameters of array) {
        fill = getFillingModeByParameters(layer, parameters)
    }
    return fill
}

export function getFillingModeByParameters(layer, parameters) {
    let fill
    switch(parameters.class) {
        case "horizontal":
            fill = new OrthogonalLinearFill(parameters)
            break
        case "vertical":
            fill = new OrthogonalLinearFill(parameters)
            break
        case "random":
            fill = new RandomFill(parameters)
            break
        case "rectangle":
            fill = new RectangleFill(parameters)
            break
        case "radial":
            fill = new RadialFill(parameters)
            break
        case "vortex":
            fill = new VortexFill(parameters)
            break
        default:
            throw Error()
    }
    return fill
}