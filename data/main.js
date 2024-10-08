import {Align, defaultCanvas, defaultFontSize} from "../../Furca/src/system.js"
import {lives} from "../main.js"
import {distFromScreen} from "../../Furca/src/canvas.js"
import {Key} from "../../Furca/src/key.js"
import {Box} from "../../Furca/src/box.js"
import {project, tileMap, tileSet} from "../../Furca/src/project.js"
import {Label} from "../../Furca/src/gui/label.js"
import {score} from "../score.js"
import {ShapeType} from "../../Furca/src/shape.js"
import {Rnd} from "../../Furca/src/function/rnd.js"
import {Constraint} from "../../Furca/src/constraint.js"
import {Layer} from "../../Furca/src/layer.js"
import {rad} from "../../Furca/src/functions.js"
import {Img} from "../../Furca/src/image.js"
import {AngularSprite} from "../../Furca/src/angular_sprite.js"

export const BrickType = {
    leftBrick: 16,
    rightBrick: 17,
    topBrick: 18,
    bottomBrick: 22,
    singleBrick: 19
}

export const brickStart = 16

export const main = {
    key: new Key("LMB"),

    lives: 2,

    lostBallDelay: {
        duration: 1.5
    },

    ball: {
        image: {
            texture: "balls",
            width: 48,
            height: 48,
        },
        angle: -45,
        speed: 15,
        size: 0.75,
        alterAngle: new Rnd(-1, 1),
        appearanceEffect: "newBall",
    },

    paddle: {
        image: {
            class: "NinePatch",
            image: {
                texture: "paddles"
            },
            horizontal1: 28,
            horizontal2: 32,
        },
        y: 10.5,
        width: 5,
        height: 1,
        shape: ShapeType.box,
        minWidth: 1,
        changingSpeed: 2.0,
    },

    turret: {
        image: {
            texture: "turret",
            yMul: 0.2,
            heightMul: 1.82,
        },

        bullet: {
            image: {
                texture: "bullet"
            },
            width: 0.5,
            height: 0.25,
            shape: ShapeType.box,
            angle: rad(-90),
            speed: 10,
        },

        flame: {
            image: {
                texture: "fire",
                yMul: 1.0,
            },

            width: 1,
            height: 2,

            delay: {
                duration: 0.1
            },
        },

        coolDown: {
            duration: 0.25
        },
    },

    score: {
        raisingSpeed: 100.0,
        duration: 0.5,
        dSize: 5,
        vertical: 100,
        horizontal: 100,
        single: 200,
    },
}

export function tuneBrickSprite(brick) {
    brick.shift(-distFromScreen(0.5), -distFromScreen(0.5))
    brick.alterSize(distFromScreen(1), distFromScreen(1))
}

export let hud, scoreLabel, livesLabel, messageLabel, paddle, turrets, firingPoints

export function init() {
    defaultCanvas(40,24)

    paddle = AngularSprite.create(main.paddle)

    turrets = new Layer()
    firingPoints = new Layer()
    for(let i = 0; i <= 1; i++) {
        let turret = AngularSprite.create(main.turret)
        turrets.add(turret)

        let firingPoint = AngularSprite.create(main.turret.flame)
        firingPoint.y = turret.top
        project.actions.push(new Constraint(firingPoint, turret))
        firingPoints.add(firingPoint)
    }

    turrets.hide()
    firingPoints.hide()

    hud = new Box(0, 0, tileMap.brackets.width - 5, tileMap.brackets.height - 3)
    livesLabel = new Label(hud, [lives], defaultFontSize, Align.right, Align.top, "I1"
        , Img.create(main.ball.image), 0.5)
    scoreLabel = new Label(hud, [score], defaultFontSize, Align.center, Align.top, "Z8")
    messageLabel = new Label(hud, [""], defaultFontSize, Align.center, Align.center)

    tileSet.bricks.setCollision(new AngularSprite(undefined, 0.5, 0.5, 1.0, 1.0, ShapeType.box)
        , 0, tileSet.bricks.quantity)
}