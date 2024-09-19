import {Sum} from "../../Furca/src/function/sum.js"
import {Rnd} from "../../Furca/src/function/rnd.js"

export const fillingMode = {
    horizontalChessboard: [{
        class: "horizontal",
        brickAppearanceEffect: "enlarge",
        filter: "chessboard",
        duration: 1,
        brickDuration: 0.3,
    }],

    horizontalBreakable: [{
        class: "horizontal",
        brickAppearanceEffect: "fadeIn",
        filter: "breakable",
        duration: 1,
        brickDuration: 0.3,
    }],

    randomBreakable: [{
        class: "random",
        brickAppearanceEffect: "fadeIn",
        filter: "breakable",
        negative: false,
        duration: 1,
        brickDuration: 0.3,
    }, {
        class: "horizontal",
        type: "bottomToTop",
        brickAppearanceEffect: "enlarge",
        filter: "breakable",
        negative: true,
        duration: 1,
        brickDuration: 0.3,
    }],

    verticalChessboard: [{
        class: "vertical",
        brickAppearanceEffect: "enlarge",
        filter: "chessboard",
        duration: 1,
        brickDuration: 0.3,
    }],

    rectangleChessboard: [{
        class: "rectangle",
        brickAppearanceEffect: "enlarge",
        filter: "chessboard",
        duration: 1,
        brickDuration: 0.3,
    }],

    randomAll: [{
        class: "random",
        brickAppearanceEffect: "enlarge",
        filter: "all",
        negative: false,
        duration: 1,
        brickDuration: 0.3,
    }],

    rectangleAll: [{
        class: "rectangle",
        brickAppearanceEffect: "enlarge",
        filter: "all",
        negative: false,
        duration: 1,
        brickDuration: 0.3,
    }],

    radialIn: [{
        class: "radial",
        type: "in",
        brickAppearanceEffect: "enlarge",
        filter: "breakable",
        negative: false,
        duration: 1,
        brickDuration: 0.3,
    }],

    radialOut: [{
        class: "radial",
        type: "out",
        brickAppearanceEffect: "fadeIn",
        filter: "all",
        negative: true,
        duration: 1,
        brickDuration: 0.3,
    }],

    particle: [{
        class: "vortex",
        type: "forward",
        filter: "all",
        negative: false,
        duration: new Sum(0.5, new Rnd(0.25)),
        dDistance: new Rnd(20),
        dAngle: new Rnd(-45, 45),
        dImageAngle: new Rnd(-90, 90),
    }],
}