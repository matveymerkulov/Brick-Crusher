import {Rnd} from "../../Furca/src/function/rnd.js"

export let appearanceEffect = {
    default: {
        duration: 0.5,
    },

    enlarge: {
        class: "resize",
        type: "forward",
        duration: 0.5,
    },

    newBall: {
        class: "resize",
        type: "forward",
        duration: 0.5,
    },

    fadeIn: {
        class: "alpha",
        type: "forward",
        duration: 0.5,
    },
}


export let disappearanceEffect = {
    shrink: {
        class: "resize",
        type: "backward",
        duration: 0.5,
    },

    fadeOut: {
        class: "alpha",
        type: "backward",
        duration: 0.5,
    },

    fall: {
        class: "fall",
        speed: 0,
        gravity: 15,
    },

    kick: {
        class: "kick",
        speed: 100,
        gravity: 10,
        angularSpeed: new Rnd(-30, 30),
    }
}