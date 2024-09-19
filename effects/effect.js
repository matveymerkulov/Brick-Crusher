export class Effect {
    constructor(layer) {
        this.layer = layer
        layer.add(this)
    }

    update() {}

    end() {
        this.layer.remove(this)
        this.next()
    }

    next() {}
}