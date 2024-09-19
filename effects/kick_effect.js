import {apsk, num} from "../../lib/system.js"
import {FallEffect} from "./fall_effect.js"
import {dist, pi} from "../../lib/functions.js"
import {balls} from "../main.js"

export class KickEffect extends FallEffect {
    constructor(layer, spriteLayer, ball, brick, parameters) {
        const speed = num(parameters.speed) * ball.speed
        const dx = brick.x - ball.x
        const dy = brick.y - ball.y
        const distance = dist(dx, dy)
        const k = speed / distance * apsk
        let angle = ball.angle - ball.angleToPoint(brick)
        while(angle > pi) {
            angle -= 2 * pi
        }
        while(angle < -pi) {
            angle += 2 * pi
        }
        let newParameters = {
            dx: dx * k,
            dy: dy * k,
            angularSpeed: num(angle) * num(parameters.angularSpeed) * ball.speed,
            speed: speed,
            gravity: parameters.gravity,
            dSize: parameters.dSize,
        }

        super(layer, spriteLayer, brick, newParameters)
    }
}